import { useState, useEffect, useRef } from 'react'
import { jwtDecode } from 'jwt-decode'
import Blog from './components/Blog'
import Notification  from './components/Notification'
import Togglable  from './components/Togglable'
import BlogForm  from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const blogFormRef = useRef()

  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token)
      const currentTime = Date.now() / 1000
      return decoded.exp < currentTime
    } catch (err) {
      return true
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    )
  }, [])

  useEffect(() => {
    const loggedBlogApp = window.localStorage.getItem('loggedBlogApp')
    if (loggedBlogApp) {
      const user = JSON.parse(loggedBlogApp)
      setUser(user)
      blogService.setToken(user.token)
      if (isTokenExpired(user.token)) {
        window.localStorage.removeItem('loggedBlogApp')
        window.localStorage.clear()
        setUser(null)
      }
    }
  } , [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user =  await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogApp', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setMessage({ text: 'wrong username or password', type:'error' })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogApp')
    window.localStorage.clear()
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()

    const returnedBlog = await blogService.create(blogObject)
    setMessage({ text: `You new blog ${blogObject.title} by ${blogObject.author} added`, type:'success' })
    setTimeout(() => {setMessage(null)}, 5000)
    setBlogs(blogs.concat(returnedBlog))
  }

  const handleLike = async (blog) => {
    const updateObject = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    const returnedBlog = await blogService.update(blog.id, updateObject)
    setBlogs(blogs.map(b => b.id !== blog.id ? b : returnedBlog).sort((a, b) => b.likes - a.likes))
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id ).sort((a, b) => b.likes - a.likes))
    }
  }

  if (user === null){
    return(
      <div>
        <h2>Login to application</h2>
        <Notification notificationMessage={message}/>
        <form onSubmit={handleLogin}>
          <div>
            username <input
              type='text'
              value={username}
              name='username'
              data-testid='username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password <input
              type='password'
              value={password}
              name='password'
              data-testid='password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }
  return (
    <div>
      <div>
        <h2>blogs</h2>
        <Notification notificationMessage={message}/>
        <p>{user.name} logged in <button onClick={handleLogOut}>logout</button></p>
      </div>
      <Togglable buttonLabel='create a new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog}/>
      </Togglable>
      <br />
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} user={user} />
        )}
      </div>
    </div>
  )
}

export default App