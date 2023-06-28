import { Router } from "express"
import authRouter from '#app/routes/authRoute.js'
import userRouter from '#app/routes/userRoute.js'
import yarnRouter from '#app/routes/yarnRoute.js'

const routes = Router()

routes.use('/api/auth', authRouter)
routes.use('/api/user', userRouter)
routes.use('/api/yarn', yarnRouter)

export default routes