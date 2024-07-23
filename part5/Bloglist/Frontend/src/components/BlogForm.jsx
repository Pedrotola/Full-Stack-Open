import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <div>
      <form onSubmit={addBlog}>
        <h2>create a new</h2>
        <div>title: <input
          type='text'
          value={title}
          name='title'
          id='blog-title'
          data-testid='blog-title'
          onChange={({ target }) => setTitle(target.value)}
        />
        </div>
        <div>author: <input
          type='text '
          value={author}
          name='author'
          id='blog-author'
          data-testid='blog-author'
          onChange={({ target }) => setAuthor(target.value)}
        />
        </div>
        <div>url: <input
          type='text'
          value={url}
          name='url'
          id='blog-url'
          data-testid='blog-url'
          onChange={({ target }) => setUrl(target.value)}
        />
        </div>
        <div><button type='submit'>create</button></div>
      </form>
    </div>
  )
}

export default BlogForm