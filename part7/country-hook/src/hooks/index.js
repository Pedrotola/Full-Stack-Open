import axios from "axios"
import { useEffect, useState } from "react"

export const useCountry = (name) => {
  const [country, setCountry] = useState([])

  useEffect(() => {
    if (!name) return
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
        .then(response => setCountry(response.data))
        .catch(error => setCountry([]))
  },[name])

  return { country, found: country.length !== 0 }
}

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }
  
  return {
    type,
    value,
    onChange
  }
}