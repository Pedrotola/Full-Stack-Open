import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
    name: 'anecdote',
    initialState: [],
    reducers: {
        voteUp(state, action) {
          const id = action.payload
          const anecdoteToChange = state.find(anec => anec.id === id )
          const anecdoteChanged = {
              ...anecdoteToChange,
              votes: anecdoteToChange.votes + 1
          }
          const votes = state.map(anec => anec.id === id ? anecdoteChanged : anec)
          return [...votes].sort((a, b)=> b.votes - a.votes)
        },
        appendAnecdote(state, action) {
          state.push(action.payload)
        }, 
        setAnecdotes(state, action){
          return action.payload.sort((a, b)=> b.votes - a.votes)
        }
    }
})

export const { appendAnecdote, setAnecdotes, voteUp } = anecdoteSlice.actions

export const initializeAnecdote = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(anecdote))
  }
}

export const voteUpdate = (id) => {
  return async dispatch => {
    const anecdote = await anecdoteService.updateAnecdote(id)
    dispatch(voteUp(anecdote.id))
  }
}

export default anecdoteSlice.reducer