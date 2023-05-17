import { Router } from "express"
import userRouter from '#app/routes/userRoute.js'
import yarnRouter from '#app/routes/yarnRoute.js'

const routes = Router()

routes.use('/api/users', userRouter)
routes.use('/api/yarn', yarnRouter)

export default routes