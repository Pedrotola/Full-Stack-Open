const {describe, test, after, beforeEach} = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/bloglist')
const helper = require('./blog_helper')

const api = supertest(app)

describe('when initially there are some blogs saved', () => {
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
  test('all blogs are returned', async () => {
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

  describe('addition of a new blog', () => {
    // Exercises 4.10
    test('succeeds with a new blog', async () =>{
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
    test('succeeds a blog without likes', async () =>{
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
      const blogLikes = blogsAtEnd[blogsAtEnd.length - 1].likes
      assert.strictEqual(blogLikes, 0)
    })
    // Exercises 4.12
    test('fails with bad request 400 if no title or url exists', async () =>{
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
  })
  // Exercises 4.13 
  describe('deleting of a blog', () =>{
    test('succeeds with statuscode 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1 )

      const title = blogsAtEnd.map(c => c.title)
      assert(!title.includes(blogToDelete.title))
    })

    test('fails with statuscode 404 if blog not exist', async () =>{
      const validNonexistingId = await helper.notExistingId()
      await api
        .delete(`/api/blogs/${validNonexistingId}`)
        .expect(404)
    })

    test('fails with statuscode 400 if id is invalid', async () =>{
      const invalidId = '5a3d5da59070081a82a3445'
      await api
        .delete(`/api/blogs/${invalidId}`)
        .expect(400)
    })
  })
  // Exercises 4.14
  describe('updating of a blog existed',  () => {
    test('succeeds if is a complete blog valid', async () =>{
      const blogsAtStart = await helper.blogsInDb()
      const validIdBlog = blogsAtStart[0].id

      const updatedBlog = {
        title: 'The life of a Hufflepuff individual',
        author: 'Pedro TM',
        url: 'https://thelifefahufflepuffindividual.com',
        likes: 10,
      }
      
      await api
        .put(`/api/blogs/${validIdBlog}`)
        .send(updatedBlog)
        .expect(200)
    })

    test('succeeds when a update a like in the blog', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const validIdBlog = blogsAtStart[0].id
      const currentLike = blogsAtStart[0].likes
      const updatedBlog = {likes: currentLike + 1}
      await api
        .put(`/api/blogs/${validIdBlog}`)
        .send(updatedBlog)
        .expect(200)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd[0].likes , currentLike + 1 )
    })
  })
})

after(async ()=>{
  await mongoose.connection.close()
})