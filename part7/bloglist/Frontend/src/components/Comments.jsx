import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addComments } from "../services/blogs"
import { useMatch } from "react-router-dom"

const Comments = ({ blog }) => {
    const queryClient = useQueryClient()
    const match = useMatch('blogs/:id')

    const commentMutation = useMutation({
        mutationFn: addComments,
        onSuccess: () => {
            queryClient.invalidateQueries(['blogs'])
        }
    })

    const addComment = (event) => {
        event.preventDefault()
        const id = match.params.id
        const comment = event.target.comment.value
        event.target.comment.value = ''
        if (!comment) return 
        commentMutation.mutate({ ...blog, id, comments: comment })
    }

    return(
        <div className="flex justify-center mt-4 pt-6">
            <div className="w-2/3">
            <h3 className='text-2xl font-semibold'>Comments</h3>
            <p className='text-gray-500 text-end'>{blog.comments.length > 1 ? `${blog.comments.length} comments` : `${blog.comments.length} comment`} • Anonymous comments</p>
            <form onSubmit={addComment} className="flex items-center">
                <input required className="bg-[#eaeaec] p-1" placeholder='Leave a comments' type="text" name="comment" id="comment"/> <button type="submit" className="bg-blue-600 text-white px-4 py-1 hover:bg-blue-700">add comment</button>
            </form>
            <ul className="list-disc mx-5">
                {blog.comments.map((comment, key) => 
                  <li key={key} className="p-2">
                    {comment}
                  </li>  
                )}
            </ul>
        </div>
        </div>
    )
}

export default Comments