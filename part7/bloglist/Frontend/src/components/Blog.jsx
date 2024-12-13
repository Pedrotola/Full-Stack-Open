import PropTypes from 'prop-types'
import { useMatch } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getBlog } from '../services/blogs'
import Comments from './Comments'

const Blog = ({ user, handleLike , handleDelete }) => {
  const id = useMatch('blogs/:id').params.id

  const resultBlog = useQuery({
    queryKey: ['blogs', id],
    queryFn: () => getBlog(id),
    enabled: !!id,
    retry: false
  })

  if (resultBlog.isLoading) return <div>Loading...</div>

  const blog = resultBlog.data

  if (!blog) return <div><h3 className='text-2xl pl-4'>This blog not found</h3></div>

  return(
    <div className='px-2'>
      <div className='container mx-auto px-8'>
        <h2 className='text-2xl'>{blog.title} {blog.author}</h2>
        <div className='space-y-1 mt-2'>
          <p><a href={blog.url} target='_blank'>{blog.url}</a></p>
          <p>likes {blog.likes} <button className='ml-3 bg-black/90 text-white px-5 hover:bg-black/80 active:bg-black' onClick={() => handleLike(blog)}>like</button></p>
          <p className='italic'>added by {blog.user.name}</p>
          {handleDelete && blog.user.username === user.username ? (
            <button className='text-rose-700' onClick={() => handleDelete(blog)}>remove</button>
          ) : null}
        </div>
      </div>
      <Comments blog={blog}/>
    </div>
  )
}

Blog.propTypes = {
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog