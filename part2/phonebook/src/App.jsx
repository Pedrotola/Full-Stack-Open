import { useEffect, useState } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification"
import personService from "./services/persons";

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState({text:null, type:'success'})

  const hooks = () => {personService.getAll().then(intialPerson => setPersons(intialPerson))}

  useEffect(hooks, [])

  const addPerson = (event) =>{
    event.preventDefault()
    if ( persons.some((person) => person.name === newName)){
      if (window.confirm(`${newName} is already add to phonebook, replace the old number with a new one?`)){
        const person = persons.find((person) => person.name === newName)
        const personChanged = { ...person, number: newNumber}
        personService.update(person.id, personChanged)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id != person.id ? p : returnedPerson))
            setMessage({text:`${newName} has updated the number`, type:'success'})
            console.log(message);
            setTimeout(() => {setMessage({text: null})}, 5000)
            setNewName('')
            setNewNumber('')
          })
          .catch(error=>{
            console.error(`An error occurred when updating a person ${error}`);
          })
      }
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService.create(personObject)
        .then(returnedPerson =>{
          setPersons(persons.concat(returnedPerson))
          setMessage({text:`Added ${newName}`, type:'success'})
          console.log(newName);
          setTimeout(() => {setMessage({text: null})}, 5000)
          console.log(message);
          setNewName('')
          setNewNumber('')
        })
        .catch(error=>{
          console.error(`An error occurred while creating a person ${error}`);
        })
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)
  const personsFilter = filter === ''
    ? persons
    : persons.filter(person => person.name.toLocaleLowerCase().includes(filter.toLowerCase()))

    const handleDeleteClick = (id, name) =>{
      if (window.confirm(`Delete ${name}?`)) {
        personService.remove(id)
          .then(setPersons(persons.filter(person => person.id !=id )))
          .catch(error=>{
            console.error(`An error occurred while deleting the person ${error}`);
            setMessage({text: `Information of ${name} has already been removed from server`, type:'error'})
            setTimeout(() => {setMessage({text: null})}, 5000)
          })
      }   
    }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification messages={message}/>
      <Filter filter={filter} handleChange={handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons personsFilter={personsFilter} handleDeleteClick={handleDeleteClick}/>
    </div>
  );
}

export default App;