const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
  logger.info('Method: ', request.method)
  logger.info('Path: ', request.path)
  logger.info('Body: ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknow endpoint' })
}

const errorHandle = (error, request, response, next) => {
  logger.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'})
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({error: error.message})
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({error: 'expected `username` to be unique'})
  } else if (error.name === 'JsonWebTokenError'){
    return response.status(401).json({error: 'token invalid'})
  } else if (error.name === 'TokenExpiredError'){
    return response.status(401).json({error: 'token expired'})
  }
  next(error)
}
// Exercises 4.20*
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  } else{
    request.token = null
  }
  next()
}
// Exercises 4.18 - 4.22*
const userExtractor = async (request, response, next) => {
  if (request.token) {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (decodedToken.id) {
      request.user = await User.findById(decodedToken.id)
    } else {
      return response.status(401).json({ error: 'token invalid' })
    }
  } else {
    return response.status(401).json({ error: 'token missing' })
  }
  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandle,
  tokenExtractor,
  userExtractor
}