import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core'
import React from 'react'
import moment from 'moment'
import { useMutation } from 'react-query'
import { queryClient } from '../../../index'
import { deletePost, likedPost } from '../../../services'
import { notifyError, notifySuccess } from '../../../ui/Notification/Notification'
import useStyles from './post-styles'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles()
  const time = moment(post.createAt).locale('ru')

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
          notifySuccess(data.data.message)
          await queryClient.refetchQueries('posts')
        }
        if (!data.data.success) notifyError(data.data.message)
      },
      onError: (error) => {
        notifyError(error.message)
      }
    })

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
        src='dsd'
      />
      <div className={classes.overlay}>
        <Typography variant='h6'>{post.creator}</Typography>
        <Typography variant='body2'>{time.fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          style={{ color: 'white' }}
          size='small'
          onClick={() => setCurrentId(post._id)}
        >
          <MoreHorizIcon />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={() => mutationLike.mutate(post._id)}><ThumbUpAltIcon fontSize="small" /> Like {post.likeCount} </Button>
        <Button size="small" color="primary" onClick={() => mutation.mutate(post._id)}><DeleteIcon fontSize="small" /> Удалить</Button>
      </CardActions>
    </Card>
  )
}

export default Post
