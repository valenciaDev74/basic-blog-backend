import express from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { postsRouter } from './routes/posts.js'
import { usersRouter } from './routes/users.js'

const app = express()
app.use(express.json())
app.disable('x-powered-by')

app.use(corsMiddleware())

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.json({ your: 'BLOG API' })
})

app.use('/posts', postsRouter)
app.use('/users', usersRouter)

app.use((req, res) => {
  res.status(404).json({ message: '404 not found' })
})

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`)
})
