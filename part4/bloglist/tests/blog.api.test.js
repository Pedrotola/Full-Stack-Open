const {test, after, beforeEach} = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/bloglist')
const helper = require('./blog_helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    for (const blog of helper.initialBlogs) {
        let newObject = new Blog(blog)
        await newObject.save()
    }
})
// Exercises 4.8
test('a returned a json', async () =>{
  await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
// Exercises 4.8
test('there are blog', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})
// Exercises 4.9
test('id as unique identifier', async () => {
  const response = await api.get('/api/blogs')
  for (const blog of response.body) {
    assert.strictEqual(blog.hasOwnProperty('id'), true)
  }
})
// Exercises 4.10
test('a valid can be added', async () =>{
    const newBlog = {
        title: 'The life of a Hufflepuff individual',
        author: 'Pedro TM',
        url: 'https://thelifefahufflepuffindividual.com',
        likes: 15
    }
    await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1 )
    
    const contents = blogsAtEnd.map(c => c.title)
    assert(contents.includes('The life of a Hufflepuff individual'))
})
// Exercises 4.11
test('a blog without likes', async () =>{
    const newBlog = {
        title: 'The life of a Hufflepuff individual',
        author: 'Pedro TM',
        url: 'https://thelifefahufflepuffindividual.com'
    }
    
    await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const blogLikes = blogsAtEnd[blogsAtEnd.length - 1].likes;
    assert.strictEqual(blogLikes, 0)
})
// Exercises 4.12
test('without title or url is a bad request 400', async () =>{
    const newBlog = {
        title: 'The life of a Hufflepuff individual',
        author: 'Pedro TM',
    }
    
    await api.post('/api/blogs')
        .send(newBlog)
        .expect(400)
    
    const blogsAtEnd = await helper.blogsInDb()    
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

after(async ()=>{
    await mongoose.connection.close()
})