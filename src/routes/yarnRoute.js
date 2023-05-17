import { Router } from "express"
import YarnController from '#controllers/yarnController.js'

const yarnRouter = Router()

yarnRouter
    .get('/:rav_id', YarnController.getById)
    .post('/', YarnController.addYarn)

export default yarnRouter