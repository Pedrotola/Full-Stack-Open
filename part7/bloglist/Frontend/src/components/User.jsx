import { useQuery } from "@tanstack/react-query"
import { useMatch } from "react-router-dom"
import { getUser } from "../services/users"

const User = () => {
  const id = useMatch('/users/:id').params.id

  const userResult = useQuery({
    queryKey: ['users', id],
    queryFn: () => getUser(id),
    enabled: !!id,
    retry: false
  })

  if (userResult.isLoading) return <div>Loading...</div>

  const user = userResult.data

  if (!user) return <div> <h2 className='text-2xl pl-4'>This users not found</h2></div>

  return(
    <div className='p-2 space-y-2'>
      <h2 className="text-2xl">{user.name}</h2>
      <ul className='list-disc marker:text-rose-800 pl-9'>
        {user.blogs.map(blog => 
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}

export default User