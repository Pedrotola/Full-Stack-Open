import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = { content, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const updateAnecdote = async (id) => {
    const content = await axios.get(`${baseUrl}/${id}`)
    const objectNew = { ...content.data, votes: content.data.votes + 1 }
    const response = await axios.put(`${baseUrl}/${id}`, objectNew)
    return response.data
}

export default { getAll, createNew, updateAnecdote }