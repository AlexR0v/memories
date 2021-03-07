import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core'
import React from 'react'
import moment from 'moment'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined'
import { useMutation } from 'react-query'
import { queryClient } from '../../../index'
import { deletePost, likedPost } from '../../../services'
import Loader from '../../../ui/Loader'
import { notifyError, notifySuccess } from '../../../ui/Notification/Notification'
import useStyles from './post-styles'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles()
  const time = moment(post.createAt).locale('ru')
  const user = JSON.parse(localStorage.getItem('profile'))

  const mutation = useMutation(deletePost,
    {
      onSuccess: async (data) => {
        if (data.data.success) {
          notifySuccess(data.data.message)
          await queryClient.refetchQueries('posts')
        }
        if (!data.data.success) notifyError(data.data.message)
      },
      onError: (error) => {
        notifyError(error.message)
      }
    })

  const mutationLike = useMutation(likedPost,
    {
      onSuccess: async (data) => {
        if (data.data.success) {
          await queryClient.refetchQueries('posts')
        }
        if (!data.data.success) notifyError(data.data.message)
      },
      onError: (error) => {
        notifyError(error.message)
      }
    })

  const Likes = () => {

    if (mutationLike.isLoading) return <Loader />

    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
             ? (
               <>
                 <ThumbUpAltIcon fontSize='small' />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
             ) : (
               <>
                 <ThumbUpAltOutlined fontSize='small' />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
             )
    }

    return <><ThumbUpAltOutlined fontSize='small' />&nbsp;Like</>
  }

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
        src='dsd'
      />
      <div className={classes.overlay}>
        <Typography variant='h6'>{post.name}</Typography>
        <Typography variant='body2'>{time.fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        {(user?.result?.googleId === post?.creator || user?.result?.name === post?.creator) && (
          <div className={classes.overlay2}>
            <Button
              onClick={() => setCurrentId(post._id)}
              style={{ color: 'white' }}
              size='small'
            >
              <MoreHorizIcon fontSize='default' />
            </Button>
          </div>
        )}
      </div>
      <div className={classes.details}>
        <Typography
          variant='body2'
          color='textSecondary'
          component='h2'
        >{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <Typography
        className={classes.title}
        gutterBottom
        variant='h5'
        component='h2'
      >{post.title}</Typography>
      <CardContent>
        <Typography
          variant='body2'
          color='textSecondary'
          component='p'
        >{post.message}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size='small'
          color='primary'
          onClick={() => mutationLike.mutate(post._id)}
        >
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <Button
            size='small'
            color='secondary'
            onClick={() => mutation.mutate(post._id)}
          >
            <DeleteIcon fontSize='small' /> Delete
          </Button>
        )}
      </CardActions>
    </Card>
  )
}

export default Post
