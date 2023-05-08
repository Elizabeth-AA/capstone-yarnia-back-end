import { Router } from "express"
import UserController from '#controllers/usersController.js'

const userRouter = Router()

userRouter
    .get('/:id', UserController.getById)
    .get('/:id/yarn', UserController.getStash)
    .post('/', UserController.addUser)

export default userRouter