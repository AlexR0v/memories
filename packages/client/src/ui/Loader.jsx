import { CircularProgress, Container, Grid } from '@material-ui/core'
import React from 'react'

const Loader = () => {
  return (
    <Container maxWidth='lg'>
      <Grid justify='center' container>
        <CircularProgress />
      </Grid>
    </Container>
  )
}

export default Loader
