import { render, screen } from '@testing-library/react'
import BlogForm from '../components/BlogForm'
import userEvent from '@testing-library/user-event'
import { expect } from 'chai'

test('<BlogForm />', async () => {
  const createBlog = vi.fn()

  const user = userEvent.setup()

  const { container } = render(<BlogForm createBlog={createBlog}/>)

  const inputTitle = container.querySelector('#blog-title')
  const inputAuthor = container.querySelector('#blog-author')
  const inputUrl = container.querySelector('#blog-url')

  const createButton = screen.getByText('create')

  await user.type(inputTitle, 'testing a form - title')
  await user.type(inputAuthor, 'testing a form - author')
  await user.type(inputUrl, 'testing a form - url')

  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)

  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'testing a form - title',
    author: 'testing a form - author',
    url: 'testing a form - url'
  })
})