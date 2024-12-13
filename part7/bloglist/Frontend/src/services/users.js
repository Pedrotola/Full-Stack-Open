import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/users'

export const getUsers = () => axios.get(baseUrl).then(response => response.data)

export const getUser = (id) => axios.get(`${baseUrl}/${id}`).then(response => response.data)