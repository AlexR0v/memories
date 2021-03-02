import { PostMessage } from '../models/postMessage.js'

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
