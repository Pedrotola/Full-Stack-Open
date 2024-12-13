const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')
const Blog = require('../models/bloglist')
const User = require('../models/user')
// Exercises 4.17
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})
// Exercises GetById
blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id  
  const blog = await Blog.findById(id,{}).populate('user', { username: 1, name: 1 })
  response.json(blog)
})

// Exercises 4.19 - 4.22*
blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
    comments: []
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  const populatedBlog = await Blog.findById(savedBlog._id).populate('user', { username: 1, name: 1 })
  response.status(201).json(populatedBlog)
})

blogsRouter.post('/:id/comments', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const id = request.params.id
  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { $push: { comments: body.comments } },
    { new: true } 
  ).populate('user', { username: 1, name: 1 })
  response.json(updatedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user,
    commment: body.comments
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new:true}).populate('user', { username: 1, name: 1 })
  response.json(updatedBlog)
})
// Exercises 4.21* - 4.22*
blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const user = request.user
  if (!blog){
    return response.status(404).json({error: 'The Blog not found'})
  }
  if (user._id.toString() === blog.user.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else { 
    return response.status(401).json({error: 'You are not authorized to delete this blog'})
  }
})

module.exports = blogsRouter