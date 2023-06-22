import { Router } from "express"
import UserController from '#controllers/userController.js'
import authenticate from "#middleware/authenticate.js"

const userRouter = Router()

userRouter
    .post('/signup', UserController.addUser)
    .post('/login', UserController.authUser)
    .post('/:userId', authenticate, UserController.addStashItem)
    .get('/:userId', authenticate, UserController.getStash)
    // .get('/:userId/yarn', authenticate, UserController.getStash)

    // .delete('/:id/yarn/:yarnId', authenticate, UserController.deleteStashItem)

export default userRouter