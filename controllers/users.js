import { UsersModel } from '../models/mongoDB/users.js'
// import { validateUser, validatePartialUser } from '..schemas/users.js'

export class UsersController {
  static async getAll (req, res) {
    const posts = await UsersModel.getAll()
    res.json(posts)
  }

  static async getById (req, res) {
    const { id } = req.params
    const user = await UsersModel.getById({ id })
    if (user) res.json(user)
    res.status(404).json({ message: 'Post not found' })
  }

  static async delete (req, res) {
    const { id } = req.params

    const result = UsersModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'User not found' })
    }

    return res.json({ message: 'User deleted' })
  }

  // static async update (req, res) {
  //   const result = validatePartialUser(req.body)

  //   if (!result.success) {
  //     return res.status(400).json({ error: JSON.parse(result.error.message) })
  //   }

  //   const { id } = req.params

  //   const updatedUser = await UsersModel.update({ id, input: result.data })

  //   return res.json(updatedUser)
  // }
}
