import { Button, Paper, Typography } from '@material-ui/core'
import * as PropTypes from 'prop-types'
import React, { useState } from 'react'
import FileBase64 from 'react-file-base64'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { queryClient } from '../../index'
import { createPost } from '../../services'
import { Input } from '../../ui/Input'
import Loader from '../../ui/Loader'
import { notifyError, notifySuccess } from '../../ui/Notification/Notification'
import useStyles from './form-styles'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object().shape({
  creator: yup
    .string()
    .required('Укажите автора'),
  title: yup
    .string()
    .required('Укажите заголовок'),

})

class Alert extends React.Component {
  render () {
    return null
  }
}

Alert.propTypes = {
  severity: PropTypes.string,
  onClose: PropTypes.any,
  children: PropTypes.node
}
const Form = () => {
  const classes = useStyles()
  const [creator, setCreator] = useState('')
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [tags, setTags] = useState('')
  const [file, setFile] = useState(null)
  const { register, handleSubmit, reset, errors } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  })

  const mutation = useMutation(createPost,
    {
      onSuccess: async (data) => {
        if (data.data.success) {
          notifySuccess(data.data.message)
          reset({})
          setCreator('')
          setTitle('')
          setMessage('')
          setTags('')
          setFile(null)
          await queryClient.refetchQueries('posts')
        }
        if (!data.data.success) notifyError(data.data.message)
      },
      onError: (error) => {
        notifyError(error.message)
      }
    })

  const onSubmit = (value) => {
    mutation.mutate({ ...value, selectedFile: file })
  }

  if (mutation.isLoading) return <Loader />

  return (
    <Paper className={classes.paper}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete='off'
        noValidate
        className={`${classes.root} ${classes.form}`}
      >
        <Typography variant='h6'>Создать карточку</Typography>
        <Input
          ref={register}
          id='creator'
          name='creator'
          label='Автор'
          type='text'
          value={creator}
          onChange={(e) => setCreator(e.target.value)}
          fullWidth
          error={!!errors.creator}
          helperText={errors?.creator?.message}
        />
        <Input
          ref={register}
          id='title'
          name='title'
          label='заголовок'
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          error={!!errors.title}
          helperText={errors?.title?.message}
        />
        <Input
          ref={register}
          id='message'
          name='message'
          label='Текст'
          type='text'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          fullWidth
        />
        <Input
          ref={register}
          id='tags'
          name='tags'
          label='Теги (через запятую)'
          type='text'
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          fullWidth
        />
        <FileBase64
          className={classes.fileInput}
          name='selectedFile'
          type='file'
          multiple={false}
          onDone={({ base64 }) => setFile(base64)}
        />
        <Button
          className={classes.buttonSubmit}
          variant='contained'
          color='primary'
          size='large'
          type='submit'
          fullWidth
        >Создать</Button>
      </form>
    </Paper>
  )
}

export default Form
