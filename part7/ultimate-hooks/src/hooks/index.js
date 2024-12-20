import { useEffect, useState } from "react"
import axios from 'axios'

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }

    const reset = () => {
        setValue('')
    }
  
    return {
      type,
      value,
      onChange,
      reset,
      attributes: {type, value, onChange}
    }
}

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])

    const getAll = async () => {
        const response = await axios.get(baseUrl)
        setResources(response.data)
    }
  
    useEffect(()=> {
        getAll()
    }, [])
  
    const create = async (resource) => {
      const response = await axios.post(baseUrl, resource)
      setResources([...resources, response.data])
    }
  
    const service = {
      create
    }
  
    return [
      resources, service
    ]
}