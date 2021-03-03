import express from 'express'
import { createPost, deletePost, getAllPosts, updatePost } from '../controllers/posts.js'


const router = express.Router()

router.get('/', getAllPosts)
router.post('/', createPost)
router.delete('/:id', deletePost)
router.put('/:id', updatePost)

export default router
