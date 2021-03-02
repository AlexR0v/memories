import { AppBar, Container, Grid, Grow, Typography } from '@material-ui/core'
import { useQuery } from 'react-query'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import memories from './assets/images/memories.png'
import Form from './components/Form/Form'
import Posts from './components/Posts/Posts'
import useStyles from './app-styles'
import { fetchPost } from './services'
import Loader from './ui/Loader'

function App () {
  const classes = useStyles()

  const {
    isLoading,
    isError,
    error
  } = useQuery('posts', fetchPost, { refetchOnWindowFocus: false })

  if(isLoading) return <Loader />
  if(isError) return <ha>{error.message}</ha>

  return (
    <Container maxWidth='lg'>
      <ToastContainer autoClose={3000} />
      <AppBar
        className={classes.appBar}
        position='static'
        color='inherit'
      >
        <Typography
          className={classes.heading}
          variant='h2'
          align='center'
        >Воспоминания</Typography>
        <img
          className={classes.image}
          src={memories}
          alt='memories'
          height={60}
        />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            justify='space-between'
            alignItems='stretch'
            spacing={4}
          >
            <Grid
              item
              xs={12}
              sm={7}
            >
              <Posts />
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
            >
              <Form />
            </Grid>
          </Grid>
        </Container>

      </Grow>
    </Container>
  )
}

export default App
