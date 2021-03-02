import React from 'react'
import { queryClient } from '../../index'
import useStyles from './posts-styles'
import Post from './Post/Post'

const Posts = () => {
  const classes = useStyles()
  const data = queryClient.getQueryData('posts').data
  console.log(data)
  return (
    <>
      <h1>Posts</h1>
      <Post />
    </>
  )
}

export default Posts
