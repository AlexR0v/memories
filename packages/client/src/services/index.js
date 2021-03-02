import axios from 'axios'

const url = 'http://localhost:5000/posts'

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
