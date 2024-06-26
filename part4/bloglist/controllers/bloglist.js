const blogsRouter = require('express').Router()
const Blog = require('../models/bloglist')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new:true})
  response.json(updatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findByIdAndDelete(request.params.id)
  if (!blog) {
    response.status(404).end()
  }else{
    response.status(204).end()
  }
})

module.exports = blogsRouter