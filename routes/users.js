import { Router } from 'express'
import { AuthController } from '../controllers/auth.js'
import { UsersController } from '../controllers/users.js'

export const usersRouter = Router()

usersRouter.get('/', UsersController.getAll)

usersRouter.get('/:id', UsersController.getById)

usersRouter.post('/', AuthController.signUp)

usersRouter.delete('/:id', UsersController.delete)
