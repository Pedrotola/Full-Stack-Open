import { useState, useEffect, useRef } from 'react'
import { jwtDecode } from 'jwt-decode'
import Blog from './components/Blog'
import Notification  from './components/Notification'
import Togglable  from './components/Togglable'
import BlogForm  from './components/BlogForm'
import User from './components/User'
import blogService, { remove, update } from './services/blogs'
import loginService from './services/login'
import { useNotificationValue } from './components/NotificationContext'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAll } from './services/blogs'
import { useLogin, useLoginValue, useLogout } from './components/LoginContext'
import { Routes, Route, Link } from 'react-router-dom'
import { getUsers } from './services/users'

const Menu = ({ user }) => {
  const logOut = useLogout()

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogApp')
    window.localStorage.clear()
    logOut()
  }
  return(
    <div className='grid grid-cols-2 p-1 content-center bg-[#2C2C2C] text-sm fixed w-full top-0 sticky'>
      <div className='space-x-2 self-center ml-5'>
        <Link className='font-bold text-white hover:bg-[#383838] rounded py-2 px-3' to={'/'}>blog</Link>
        <Link className='font-bold text-white hover:bg-[#383838] rounded py-2 px-3'
            to={'/users'}>users</Link>

      </div>
      <div className='text-end pr-2 text-white'>
       <p className='italic space-x-2'><strong>{user.name}</strong> logged in! <button onClick={handleLogOut} className='border rounded px-2 py-1 m-1 text-white hover:bg-[#82d2f7] hover:text-black hover:rounded-none hover:border-[#82d2f7]'>logout</button>
       </p>
      </div>
    </div>
  )
}

const BlogList = ({ blogs }) => {
  
  const blogFormRef = useRef()

  return(
    <div>
      <div>
        <Togglable buttonLabel='create a new blog +' ref={blogFormRef}>
          <BlogForm />
        </Togglable>
      </div>
      <br />
      <div className='p-2'>
        {blogs.map(blog => 
        <div className='p-2 pl-2 border mb-2 blog hover:bg-black/10  border border-solid border-black/200 hover:border-l-emerald-500' key={blog.id}>
          <Link to={`/blogs/${blog.id}`}><span className='blog-title'>{blog.title}</span> {blog.author}</Link>
        </div>
        )}
      </div>
    </div>
  )
}

const Users = () => {
  const usersResult = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    retry: false
  })

  if (usersResult.isLoading) return <div>Loading...</div>

  if (usersResult.isError) return <div>Error</div>

  const users = usersResult.data

  return(
    <div className='p-2'>
      <h2 className='text-2xl'>Users</h2>
      <div className='w-full h-full'>
        <table className='w-full mt-4 table-auto text-center rounded'>
          <thead>
            <tr className='bg-[#f8f9fd] border-b border-slate-300'>
              <td></td>
              <td className='py-4 px-3'>Blogs Created</td>
            </tr>
          </thead>
          <tbody>
            {users.map(user =>
              <tr key={user.id} className='bg-[#fff] border-y border-[#fafbfb]'>
                <td className='p-2 font-bold hover:text-rose-800'>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>                
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            )}
          </tbody>
      </table>
      </div>
    </div>
  )
}

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const setNotification = useNotificationValue()
  const logIn = useLogin()
  const user = useLoginValue()
  const logOut = useLogout()
  const queryClient = useQueryClient()

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
    const loggedBlogApp = window.localStorage.getItem('loggedBlogApp')
    if (loggedBlogApp) {
      const user = JSON.parse(loggedBlogApp)
      if (isTokenExpired(user.token)) {
        window.localStorage.removeItem('loggedBlogApp')
        window.localStorage.clear()
        logOut()
      } else {
        blogService.setToken(user.token)
        logIn(user)
      }
    }
  } , [])

  const blogsResult = useQuery({
    queryKey: ['blogs'],
    queryFn: getAll,
    retry: false
  })
  
  const voteUp = useMutation({
    mutationFn: update,
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs'])
    }
  })

  const deleteBlog = useMutation({
    mutationFn: remove,
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs'])
    }
  })

  if (blogsResult.isLoading) return <div>Loanding...</div>

  if (blogsResult.isError) return <div>blogs Error</div>

  const blogs = blogsResult.data.sort((a, b) => b.likes - a.likes)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user =  await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogApp', JSON.stringify(user))
      blogService.setToken(user.token)
      logIn(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setNotification({ message: 'wrong username or password', type: 'error' })
    }
  }

  const handleLike = ( blog ) => voteUp.mutate({ ...blog, likes: blog.likes + 1, user: blog.user.id })

  const handleDelete = ( blog ) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog.mutate(blog.id)
    }
  }

  if (user === null){
    return(
      <div className='text-center'>
        <h2 className='text-2xl font-bold pt-3'>Login to application</h2>
        <Notification />
        <form onSubmit={handleLogin} className='space-y-3 pt-10'>
          <div>
            username <input
              className='bg-[#eaeaec] rounded p-1'
              type='text'
              value={username}
              name='username'
              autoComplete='off'
              data-testid='username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password <input
              className='bg-[#eaeaec] rounded p-1'
              type='password'
              value={password}
              name='password'
              autoComplete='off'
              data-testid='password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button className='bg-[#1b1b1e] text-white font-bold py-2 px-5'
            type='submit'>login</button>
        </form>
      </div>
    )
  }
  return (
    <div className='overflow-y-scroll h-screen flex flex-col'>
      <Menu user={user}/>
      <div className='flex-1'>
        <div>
          <h2 className='text-2xl text-center font-bold py-2'>Blogs</h2>
          <Notification />
        </div>
        <Routes>
          <Route path='/' element={< BlogList blogs={blogs}/>} />
          <Route path='/blogs/:id' element={<Blog user={user} handleLike={handleLike} handleDelete={handleDelete} />} />
          <Route path='/users/' element={< Users />} />
          <Route path='/users/:id' element={< User />}/>
        </Routes>
      </div>
    </div>
  )
}

export default App