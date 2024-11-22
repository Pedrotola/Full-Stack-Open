import { useDispatch, useSelector } from "react-redux";
import { voteUpdate } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => {
    if (state.filter === 'ALL') {
      return state.anecdote
    } else {
      return state.anecdote.filter( (a) => {
        return a.content.toLowerCase().includes(state.filter.toLowerCase())
      })
    }
  });

  const vote = (id, content) => {
    //console.log("vote", id)
    dispatch(voteUpdate(id))
    dispatch(setNotification(`you voted '${content}'`, 5))
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes} <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
