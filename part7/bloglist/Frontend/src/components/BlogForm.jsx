import { useMutation, useQueryClient } from '@tanstack/react-query'
import { create } from '../services/blogs'
import { useNotificationValue } from './NotificationContext'

const BlogForm = () => {

  const queryClient = useQueryClient()
  const setNotification = useNotificationValue()

  const newBlogMutation = useMutation({
    mutationFn: create,
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries(['blogs'])
      setNotification({ message: `You new blog ${newBlog.title} by ${newBlog.author} added!`, type:'success' })
    }
  })

  const addBlog = (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
    newBlogMutation.mutate({ title, author, url })
  }

  return(
    <div className="bg-white pl-5">
      <form onSubmit={addBlog} className="space-y-2">
        <h2 className="text-2xl font-bold">Create a new blog</h2>
        <div>title: <input required className="bg-[#eaeaec] rounded p-1" type="text" name="title" id="blog-title" data-testid="blog-title" /></div>
        <div>author: <input required className="bg-[#eaeaec] rounded p-1" type="text" name="author" id="blog-author" data-testid="blog-author" /></div>
        <div>url: <input required className="bg-[#eaeaec] rounded p-1" type="text" name="url" id="blog-url" data-testid="blog-url" /></div>
        <div>
          <button type="submit" className='bg-[#4CAF50] hover:bg-[#388E3C] text-gray-100 pl-3 pr-3 pb-2 pt-2 font-bold'>Create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm