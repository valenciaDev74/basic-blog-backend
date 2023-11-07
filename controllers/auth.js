import { UsersModel } from '../models/mongoDB/users.js'
import jwt from 'jsonwebtoken'
import { validateUser } from '../schemas/users.js'
import dotenv from 'dotenv'
dotenv.config()

export class AuthController {
  static async signUp (req, res) {
    const result = validateUser(req.body)
    console.log(result)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const existingUser = await UsersModel.getByEmail({ email: result.data.email })

    if (existingUser) {
      return res.status(400).json({ message: 'That email is already registered' })
    }

    const hashedPassword = await UsersModel.encriptPassword({ password: result.data.password })

    const newUser = await UsersModel.create({ input: result.data, password: hashedPassword })

    const token = jwt.sign(
      { id: newUser.insertedId },
      process.env.SECRET_KEY,
      { expiresIn: 60 * 60 * 24 } // 24 horas
    )

    res.status(201).json({
      message: 'User was created',
      auth: true,
      token
    })
  }

  static async logIn (req, res) {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const user = await UsersModel.getByEmail({ email })

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const match = await UsersModel.decryptPassword({ password, hash: user.password })

    if (!match) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.SECRET_KEY,
      { expiresIn: 86400 }
    )

    res.json({
      message: 'Auth successful',
      auth: true,
      token
    })
  }
}
