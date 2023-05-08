import cors from 'cors'
import routes from '#routes'
const express = require('express')
const app = express()

app.use((req, res, next) => {
    console.log('->', req.method, req.url)
    next()
})

app.use(cors())
app.use(express.json())
app.use(routes)

export default app