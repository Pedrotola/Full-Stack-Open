import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../request"
import { useNotificationValue } from "./NotificationContext"

const AnecdoteForm = () => {

  const queryClient = useQueryClient()

  const setNotification = useNotificationValue()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newNote) => {
      const notes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], notes.concat(newNote))
      setNotification(`Create a new anecdote '${newNote.content}'`)
    },
    onError: (error) => {
      setNotification(`${error.response.data.error}`)
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({ content, votes: 0})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm