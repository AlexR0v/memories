import axios from 'axios'

const url = `https://memories-application-mern.herokuapp.com/posts`

export const fetchPost = async () => {
  try {
    return await axios.get(url)
  } catch (e) {
    console.log(e)
  }
}

export const createPost = async (data) => {
  try {
    return await axios.post(url, data)
  } catch (e) {
    console.log(e)
  }
}

export const deletePost = async (data) => {
  try {
    return await axios.delete(`${url}/${data}`)
  } catch (e) {
    console.log(e)
  }
}

export const updatePost = async (data) => {
  try {
    return await axios.put(`${url}/${data.currentId}`, data.value)
  } catch (e) {
    console.log(e)
  }
}

export const likedPost = async (data) => {
  try {
    return await axios.patch(`${url}/${data}`)
  } catch (e) {
    console.log(e)
  }
}
