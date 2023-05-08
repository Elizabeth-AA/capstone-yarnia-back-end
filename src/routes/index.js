import { Router } from "express"
import usersRouter from '#app/routes/usersRoute.js'
import yarnRouter from '#app/routes/yarnRoute.js'

const routes = Router()

routes.use('/api/users', usersRouter)
routes.use('/api/yarn', yarnRouter)