import { Avatar, Button, Container, Grid, IconButton, InputAdornment, Paper, Typography } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import React, { useState } from 'react'
import GoogleLogin from 'react-google-login'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { useHistory } from 'react-router'
import { authenticated, login } from '../../services'
import { Input } from '../../ui/Input'
import Loader from '../../ui/Loader'
import { notifyError, notifySuccess } from '../../ui/Notification/Notification'
import useStyles from './auth-styles'
import Icon from './Ikon'

const initialState = { name: '', email: '', password: '', passwordConfirm: '' }

const Auth = () => {
  const classes = useStyles()
  const [isSignup, setIsSignup] = useState(false)
  const [form, setForm] = useState(initialState)
  const history = useHistory()

  const { register, handleSubmit, errors, setError, reset } = useForm({
    defaultValues: initialState
  })

  const mutationAuth = useMutation(authenticated,
    {
      onSuccess: async ({ data }) => {
        if (data.success) {
          const result = data.result
          const token = data.token
          localStorage.setItem('profile', JSON.stringify({ result, token }))
          notifySuccess(data.message)
          reset({})
          setForm(initialState)
          await history.push('/')
          await queryClient.refetchQueries('posts')
        }
        if (!data.success) notifyError(data.message)
      },
      onError: (error) => {
        notifyError(error.message)
      }
    })

  const mutationLogin = useMutation(login,
    {
      onSuccess: async ({ data }) => {
        if (data.success) {
          const result = data.result
          const token = data.token
          localStorage.setItem('profile', JSON.stringify({ result, token }))
          reset({})
          setForm(initialState)
          await history.push('/')
          await queryClient.refetchQueries('posts')
        }
        if (!data.success) notifyError(data.message)
      },
      onError: (error) => {
        notifyError(error.message)
      }
    })

  const onSubmit = (value) => {
    if (isSignup && form.password !== form.passwordConfirm) {
      setError('passwordConfirm', {
        message: 'Пароли не совпадают'
      })
    } else if (isSignup) {
      mutationAuth.mutate(value)
    } else {
      mutationLogin.mutate(value)
    }
  }

  const switchMode = () => {
    setForm(initialState)
    setIsSignup((prevIsSignup) => !prevIsSignup)
    setShowPassword(false)
  }

  const [showPassword, setShowPassword] = useState(false)
  const handleShowPassword = () => setShowPassword(prev => !prev)
  const queryClient = useQueryClient()

  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
  const handleShowPasswordConfirm = () => setShowPasswordConfirm(prev => !prev)

  const handleChange = (e) => setForm({ ...form, [ e.target.name ]: e.target.value })

  const googleError = () => notifyError('Что-то пошло не так. Попробуйте позже.')

  const googleSuccess = async (res) => {
    const result = res?.profileObj
    const token = res?.tokenId

    queryClient.setQueryData('googleAuth', { result, token })
    localStorage.setItem('profile', JSON.stringify({ result, token }))
    history.push('/')
  }

  return (
    <Container
      component='main'
      maxWidth='xs'
    >
      <Paper
        className={classes.paper}
        elevation={3}
      >
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>{isSignup ? 'Зарегистрироваться' : 'Войти'}</Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid
            container
            spacing={2}
          >
            <Grid
              xs={6}
              md={12}
              item
            >
              <Input
                ref={register}
                id='email'
                name='email'
                label='Email'
                type='email'
                fullWidth
                required
                xs={6}
                onChange={handleChange}
              />
            </Grid>
            {
              isSignup &&
              <Grid
                xs={6}
                md={12}
                item
              >
                <Input
                  ref={register}
                  id='name'
                  name='name'
                  label='Имя'
                  type='text'
                  fullWidth
                  xs={6}
                  onChange={handleChange}
                />
              </Grid>
            }
            <Grid
              xs={6}
              md={12}
              item
            >
              <Input
                ref={register}
                id='password'
                name='password'
                label='Пароль'
                fullWidth
                required
                type={showPassword ? 'text' : 'password'}
                xs={6}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors?.password?.message}
                InputProps={
                  {
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton onClick={handleShowPassword}>
                          {!showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }
                }
              />
            </Grid>
            {
              isSignup &&
              <Grid
                xs={6}
                md={12}
                item
              >
                <Input
                  ref={register}
                  id='passwordConfirm'
                  name='passwordConfirm'
                  label='Пароль еще раз'
                  fullWidth
                  onChange={handleChange}
                  type={showPasswordConfirm ? 'text' : 'password'}
                  xs={6}
                  error={!!errors.passwordConfirm}
                  helperText={errors?.passwordConfirm?.message}
                  InputProps={
                    {
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton onClick={handleShowPasswordConfirm}>
                            {!showPasswordConfirm ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }
                  }
                />
              </Grid>
            }
            {
              mutationAuth.isLoading || mutationLogin.isLoading
              ? <Loader />
              : <>
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                  className={classes.submit}
                >
                  {isSignup ? 'Зарегистрироваться' : 'Войти'}
                </Button>
                <GoogleLogin
                  clientId='642430845279-fu5ds11v4n4gsqjaguqt2sb9hcv5d8kc.apps.googleusercontent.com'
                  render={props => (
                    <Button
                      className={classes.googleButton}
                      color='primary'
                      fullWidth
                      onClick={props.onClick}
                      disabled={props.disabled}
                      startIcon={<Icon />}
                      variant='contained'
                    >
                      Войти с Google
                    </Button>
                  )}
                  onSuccess={googleSuccess}
                  onFailure={googleError}
                  cookiePolicy='single_host_origin'
                />
              </>
            }
          </Grid>
        </form>
        <Grid
          container
          justify='flex-end'
        >
          <Grid item>
            <Button onClick={switchMode}>
              {isSignup ? 'Есть аккаунт?' : 'Нет аккаунта?'}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

export default Auth
