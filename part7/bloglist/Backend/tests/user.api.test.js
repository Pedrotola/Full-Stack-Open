const {describe, test, after, beforeEach} = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const User = require('../models/user')
const helper = require('./blog_helper')

const api = supertest(app)

describe('when initially there is a saved user', () => {
  beforeEach( async () => {
    await User.deleteMany({})

    const saltRounds = 10
    const passwordHash = await bcrypt.hash('admin', saltRounds)

    const user = new User({
      username: 'admin', 
      name: 'administrator', 
      passwordHash
    })
    await user.save()
  })

  describe('adding a new user', () => {
    test('succeeds when the user is successfully added', async () =>{
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'tolam',
        name: 'Pedro',
        password: 'password'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      
      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1 )
    
      const usernames = usersAtEnd.map(c => c.username)
      assert(usernames.includes(newUser.username))
    })

    test('succeeds when the user has no name', async () =>{
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'tolam',
        password: 'password'
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        
      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1 )
      
      const usernames = usersAtEnd.map(c => c.username)
      assert(usernames.includes(newUser.username))
    })

    test('fails when the username not is unique', async () =>{
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'admin',
        name: 'Administrator2',
        password: 'admin'
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
        
      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length )
    })

    test('fails when password not existing', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'tolam',
        name: 'Pedro'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
      
      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('fails when username not existing', async () =>{
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        name: 'Pedro',
        password: 'password'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
      
      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('fails when the username is not longer than 3 characters', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 't',
        name: 'Pedro',
        password: 'password'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
    
      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('fails when the password is not longer than 3 characters', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'tolam',
        name: 'Pedro',
        password: 'p'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
      
      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
  })
})
