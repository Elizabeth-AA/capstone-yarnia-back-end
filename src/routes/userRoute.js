import { Router } from "express"
import UserController from '#controllers/userController.js'
import authenticate from "#middleware/authenticate.js"

const userRouter = Router()

userRouter
    .post('/:userId', authenticate, UserController.addStashItem)
    .get('/:userId', authenticate, UserController.getStash)
    .delete('/:userId/:yarnId', authenticate, UserController.deleteStashItem)

export default userRouter