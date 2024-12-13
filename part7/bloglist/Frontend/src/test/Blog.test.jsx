import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'


describe('<Blog />', () => {
  const blog = {
    title: 'My First Blog',
    author: 'Author Independent',
    url: 'https://new-blog.com/blog-test',
    likes: 0,
    user:{
      username: '',
      name: ''
    }
  }
  const user = {
    username: '',
    name: ''
  }

  test('render content', () => {
    const handleLike = vi.fn()
    const handleDelete = vi.fn()

    render(<Blog blog={blog} handleLike={handleLike} handleDelete={handleDelete} user={user}/>)

    const primaryElement = screen.getByText('My First Blog')
    expect(primaryElement).toBeDefined()
    const secondElement = screen.getByText('Author Independent')
    expect(secondElement).toBeDefined()

    const urlElement = screen.queryByText('https://new-blog.com/blog-test')
    expect(urlElement).toBeNull()

    const likesElement = screen.queryByText('0')
    expect(likesElement).toBeNull()
  })

  test('check url and likes when clic in view', async () => {
    const handleLike = vi.fn()
    const handleDelete = vi.fn()

    render(<Blog blog={blog} handleLike={handleLike} handleDelete={handleDelete} user={user}/>)

    const eventUser = userEvent.setup()
    const viewButton = screen.getByText('view')
    await eventUser.click(viewButton)

    const urlElement = screen.findByText('https://new-blog.com/blog-test')
    expect(urlElement).toBeDefined()

    const likesElement = screen.getByText('0', { exact: false })
    expect(likesElement).toBeDefined()
  })

  test('check double clic in likes', async () => {
    const handleLike = vi.fn()
    const handleDelete = vi.fn()

    render(<Blog blog={blog} handleLike={handleLike} handleDelete={handleDelete} user={user}/>)

    const eventUser = userEvent.setup()
    const viewButton = screen.getByText('view')
    await eventUser.click(viewButton)

    const likeButton  = screen.getByText('like')
    await eventUser.click(likeButton)
    await eventUser.click(likeButton)

    expect(handleLike.mock.calls).toHaveLength(2)
  })
})