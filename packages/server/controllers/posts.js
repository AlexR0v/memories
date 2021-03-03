import { PostMessage } from '../models/postMessage.js'
import mongoose from 'mongoose'

export const getAllPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find()
    res.status(200).json({ success: true, data: postMessages })
  } catch (e) {
    res.status(404).json({ message: e.message })
  }
}

export const createPost = async (req, res) => {
  const newPost = new PostMessage(req.body)
  try {
    await newPost.save()
    res.status(201).json({ success: true, message: 'Пост создан', data: newPost })
  } catch (e) {
    res.status(409).json({ message: e.message })
  }
}

export const deletePost = async (req, res) => {
  try {
    const post = await PostMessage.findByIdAndDelete(req.params.id)
    const posts = await PostMessage.find()
    if (!post) {
      return res.status(400).json({ success: false, message: 'Пост не найден' })
    }
    res.status(200).json({ success: true, data: posts, message: 'Пост удален!' })
  } catch (e) {
    res.status(409).json({ message: e.message })
  }
}

export const updatePost = async (req, res) => {
  try {
    const { id: _id } = req.params
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).json({ success: false, message: 'Пост не найден' })
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, req.body, { new: true })
    res.status(200).json({ success: true, data: updatedPost, message: 'Пост обновлен' })
  } catch (e) {
    res.status(409).json({ message: e.message })
  }
}
