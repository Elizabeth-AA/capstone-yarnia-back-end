import { Router } from "express"
import UserController from '#controllers/userController.js'

const userRouter = Router()

userRouter
    // .post('/', UserController.addUser)
    .get('/:id', UserController.getById)
    .get('/:id/yarn', UserController.getStash)
    .post('/', UserController.addStashItem)
    // .delete('/:id/yarn/:yarnId', UserController.deleteStashItem)

export default userRouter