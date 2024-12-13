import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

export const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export const getBlog = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

export const update = async (updateObject) => {
  const response = await axios.put(`${baseUrl}/${updateObject.id}`, updateObject)
  return response.data
}

export const remove = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export const addComments = async updateObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(`${baseUrl}/${updateObject.id}/comments`, updateObject, config)
  return response.data
}

export default { getAll, create, update, remove, setToken, addComments }