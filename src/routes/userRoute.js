import { Router } from "express"
import UserController from '#controllers/userController.js'
import authenticate from "#middleware/authenticate.js"

const userRouter = Router()

userRouter
    .post('/signup', UserController.addUser)
    .post('/login', UserController.authUser)
    .get('/:id', authenticate, UserController.getById)
    .get('/:id/yarn', authenticate, UserController.getStash)
    .post('/', authenticate, UserController.addStashItem)
    // .delete('/:id/yarn/:yarnId', authenticate, UserController.deleteStashItem)

export default userRouter