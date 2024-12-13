import React, { useState } from 'react'
import { useCountry, useField } from './hooks'

const Country = ({ country }) => {
  
  if (!country.country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.country.name.common}</h3>
      <div>capital {country.country.capital}</div>
      <div>population {country.country.population}</div> 
      <img src={country.country.flags.svg} height='100' alt={country.country.flags.alt}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App