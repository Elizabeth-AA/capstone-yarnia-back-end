import { Router } from "express"
import AuthController from "#controllers/authController.js"

const authRouter = Router()

authRouter
    .post('/signup', AuthController.addUser)
    .post('/login', AuthController.authUser)

export default authRouter