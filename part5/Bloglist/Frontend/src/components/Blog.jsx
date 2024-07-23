import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike , handleDelete, user }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return(
    <div style={blogStyle} className='blog'>
      <div>
        <span className='blog-title'>{blog.title}</span> {blog.author} <button onClick={() => setVisible(!visible)}>{!visible ? 'view': 'hide'}</button>
        { visible &&
        (<div className='blogDetails'>
          <p>
            {blog.url} <br />
            likes {blog.likes} <button onClick={() => handleLike(blog)}>like</button> <br />
            {blog.user.name} <br />
            {handleDelete && blog.user.username === user.username ? (
              <button onClick={() => handleDelete(blog)}>remove</button>
            ) : null}
          </p>
        </div>)
        }
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog