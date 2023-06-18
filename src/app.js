import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import routes from '#routes'
import authenticate from '#middleware/authenticate.js'

const app = express()

app.use((req, res, next) => {
    console.log('->', req.method, req.url)
    next()
})

app.use(bodyParser.json())
app.use(cors())
app.use(express.json())
app.use(authenticate)
app.use(routes)

export default app