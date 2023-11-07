import { PostsModel } from '../models/mongoDB/posts.js'
import { validatePost, validatePartialPost } from '../schemas/posts.js'

export class PostController {
  static async getAll (req, res) {
    const posts = await PostsModel.getAll()
    res.json(posts)
  }

  static async getById (req, res) {
    const { id } = req.params
    const post = await PostsModel.getById({ id })
    if (post) res.json(post)
    res.status(404).json({ message: 'Post not found' })
  }

  static async create (req, res) {
    const result = validatePost(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newPost = await PostsModel.create({ input: result.data })

    res.status(201).json(newPost)
  }

  static async delete (req, res) {
    const { id } = req.params

    const result = PostsModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'Post not found' })
    }

    return res.json({ message: 'Post deleted' })
  }

  static async update (req, res) {
    const result = validatePartialPost(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updatedPost = await PostsModel.update({ id, input: result.data })

    return res.json(updatedPost)
  }
}
