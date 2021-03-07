import axios from 'axios'

const API = axios.create({
  baseURL: 'https://memories-application-mern.herokuapp.com'
})

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    const token = JSON.parse(localStorage.getItem('profile')).token
    req.headers.Authorization = `Bearer ${token}`
  }
  return req
})

export const fetchPost = async () => {
  try {
    return await API.get('/posts')
  } catch (e) {
    console.log(e)
  }
}

export const createPost = async (data) => {
  try {
    return await API.post('/posts', data)
  } catch (e) {
    console.log(e)
  }
}

export const deletePost = async (data) => {
  try {
    return await API.delete(`/posts/${data}`)
  } catch (e) {
    console.log(e)
  }
}

export const updatePost = async (data) => {
  try {
    return await API.put(`/posts/${data.currentId}`, data.value)
  } catch (e) {
    console.log(e)
  }
}

export const likedPost = async (data) => {
  try {
    return await API.patch(`/posts/${data}`)
  } catch (e) {
    console.log(e)
  }
}

export const authenticated = async (data) => {
  try {
    return await API.post(`users/sign-up`, data)
  } catch (e) {
    console.log(e)
  }
}

export const login = async (data) => {
  try {
    return await API.post(`users/sign-in`, data)
  } catch (e) {
    console.log(e)
  }
}
