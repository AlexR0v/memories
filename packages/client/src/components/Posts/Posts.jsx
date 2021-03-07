import { Grid } from '@material-ui/core'
import React from 'react'
import { queryClient } from '../../index'
import useStyles from './posts-styles'
import Post from './Post/Post'

const Posts = ({setCurrentId}) => {
  const classes = useStyles()
  const data = queryClient.getQueryData('posts')?.data
  return (
    <>
      <Grid
        className={classes.mainContainer}
        container
        alignItems='stretch'
        spacing={3}
      >
        {
          data?.data && data?.data.map(post => (
            <Grid
              key={post._id}
              item
              xs={12}
              sm={6}
            >
              <Post post={post} setCurrentId={setCurrentId} />
            </Grid>
          ))
        }
      </Grid>
    </>
  )
}

export default Posts
