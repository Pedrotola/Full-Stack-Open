const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// Exercises 4.17
usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { url: 1, title: 1, author: 1 })
  response.json(users)
})

// Exercises 4.17 GetById User
usersRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const user = await User
    .findById(id, {}).populate('blogs', { url: 1, title: 1, author: 1 })
  response.json(user)
})

usersRouter.post('/', async (request, response)=>{
  const {username, name, password} = request.body

  if (!password) {
    return response.status(400).json({error: 'User validation failed: password: Path `password` is required.'})
  } else if (password.length < 3){
    return response.status(400).json({error: 'User validation failed: password: Path `password` is shorter than the minimum allowed length (3).'})
  } else {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username, 
      name, 
      passwordHash
    })
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  }
})

module.exports = usersRouter