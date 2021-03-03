import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import postRoutes from './routes/post.js'

const app = express()
dotenv.config()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())
app.use('/posts', postRoutes)

const MONGO_URL = process.env.MONGO_URL

const PORT = process.env.PORT ?? 5000

const start = async () => {
  try {
    const connect = await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log(`MongoDB connected: ${connect.connection.host}`)
    await app.listen(PORT, () => {
      console.log(`Server started on port:${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()
