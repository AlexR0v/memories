import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import useStyles from './navbar-styles'
import decode from 'jwt-decode'
import memories from '../../assets/images/memories.png'

const NavBar = () => {
  const classes = useStyles()

  const queryClient = useQueryClient()
  const location = useLocation()

  const [user, setUser] = useState(null)

  const logOut = () => {
    setUser(null)
    localStorage.clear()
    queryClient.removeQueries('googleAuth', { exact: true })
    window.location.replace('/')
  }

  useEffect(() => {
    const token = user?.token
    if (token) {
      const decodedToken = decode(token)

      if (decodedToken.exp * 1000 < new Date().getTime()) logOut()
    }
    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])

  return (
    <AppBar
      className={classes.appBar}
      position='static'
      color='inherit'
    >
      <div className={classes.brandContainer}>
        <Typography
          className={classes.heading}
          component={Link}
          to='/'
          variant='h2'
          align='center'
        >Memories</Typography>
        <img
          className={classes.image}
          src={memories}
          alt='memories'
          height={60}
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {
          user ? (
            <div className={classes.profile}>
              <Avatar
                className={classes.purple}
                alt={user.result.name}
                src={user.result.imageUrl}
              >{user.result.name.charAt(0)}</Avatar>
              <Typography
                className={classes.userName}
                variant='h6'
              >{user.result.name}</Typography>
              <Button
                variant='contained'
                className={classes.logout}
                color='secondary'
                onClick={logOut}
              >Выйти</Button>
            </div>
          ) : (
            <Button
              component={Link}
              to='/auth'
              variant='contained'
              color='primary'
            >Вход</Button>
          )
        }
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
