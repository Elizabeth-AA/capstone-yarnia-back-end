import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import routes from '#routes'

const app = express()

app.use((req, res, next) => {
    console.log('->', req.method, req.url)
    next()
})

app.use(bodyParser.json())
app.use(cors())
app.use(express.json())
app.use(routes)

export default app