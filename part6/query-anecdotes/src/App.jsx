import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAnecdotes, voteAnecdote } from "./request";
import { useNotificationValue } from "./components/NotificationContext";

const App = () => {

  const queryClient = useQueryClient()

  const setNotification = useNotificationValue()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: false,
  })

  const voteUp = useMutation({
    mutationFn: voteAnecdote, 
    onSuccess: () => {
      queryClient.invalidateQueries(['anecdotes'])
    }
  })

  if (result.isLoading) {
    return <div>loanding data...</div>
  } 
  if (result.isError) {
    return <div>anecdote services not available due to problems in server</div>
  }

  const anecdotes = result.data.sort((a, b)=> b.votes - a.votes)

  const handleVote = (anecdote) => { 
    console.log(`vote for ${anecdote.content}`)
    voteUp.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    setNotification(`Voted for '${anecdote.content}'`)
  }

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      {
      anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes} <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))
      }
    </div>
  );
};

export default App;