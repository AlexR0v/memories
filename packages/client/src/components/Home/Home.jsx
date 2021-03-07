import { Container, Grid, Grow } from '@material-ui/core'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { fetchPost } from '../../services'
import Loader from '../../ui/Loader'
import Form from '../Form/Form'
import Posts from '../Posts/Posts'

const Home = () => {
  const [currentId, setCurrentId] = useState(null)

  const {
    isLoading,
    isError,
    error
  } = useQuery('posts', fetchPost, { refetchOnWindowFocus: false })

  if (isLoading) return <Loader />
  if (isError) return <ha>{error.message}</ha>

  return (
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
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
          >
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>

    </Grow>
  )
}

export default Home
