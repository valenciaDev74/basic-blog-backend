import { Router } from 'express'
import { PostController } from '../controllers/posts.js'
import verifyToken from '../middlewares/verifyToken.js'

export const postsRouter = Router()

postsRouter.get('/', PostController.getAll)

postsRouter.get('/:id', PostController.getById)

postsRouter.use(verifyToken)

postsRouter.post('/', PostController.create)

postsRouter.delete('/:id', PostController.delete)

postsRouter.patch('/:id', PostController.update)
