const Person = ( { id, name, number, handleDeleteClick } ) =>{
  return (
    <li>
      {name} {number} <button onClick={() => handleDeleteClick(id, name)}>delete</button>
    </li>
  )
}

const Persons = ({ personsFilter, handleDeleteClick }) => {
    return (
        <div>
          {personsFilter.map(person =>
            <Person 
              key={person.id} 
              id={person.id} 
              name={person.name} 
              number={person.number} 
              handleDeleteClick={handleDeleteClick}/>
          )}
        </div>
    );
}

export default Persons;
