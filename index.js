const express = require('express')
const bodyParser = require('body-parser')
const {testConnection} = require('./conn/conn')
const router = require('./router')
const errorHandler = require('./middlewares/errorHandler')
const cors = require("cors");
const morgan = require('morgan')
require('dotenv').config()

const app = express()
const port = process.env.PORT

testConnection()

app.use(cors());
app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', router)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server running in port ${port}`)
})