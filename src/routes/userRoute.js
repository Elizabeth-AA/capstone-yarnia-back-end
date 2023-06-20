import { Router } from "express"
import UserController from '#controllers/userController.js'
// import authenticate from "#middleware/authenticate.js"

const userRouter = Router()

userRouter
    .post('/signup', UserController.addUser)
    .post('/login', UserController.authUser)
    .get('/:id', UserController.getById)
    .get('/:id/yarn', UserController.getStash)
    .post('/', UserController.addStashItem)
    // .delete('/:id/yarn/:yarnId', authenticate, UserController.deleteStashItem)

export default userRouter