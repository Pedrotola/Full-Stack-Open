require('express-async-errors')
const express = require('express')
const app = express()
const cors = require('cors')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/bloglist')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('connecting to... ')

mongoose.connect(config.MONGODB_URI).then(()=>{
  logger.info('Connect to MongoDB')
}).catch( error => {
  logger.info(config.URL)
  logger.error('error connecting to MongoDB', error.message)
})

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandle)

module.exports = app