import express from 'express'
import { createPost, deletePost, getAllPosts, likedPost, updatePost } from '../controllers/posts.js'


const router = express.Router()

router.get('/', getAllPosts)
router.post('/', createPost)
router.delete('/:id', deletePost)
router.put('/:id', updatePost)
router.patch('/:id', likedPost)

export default router
