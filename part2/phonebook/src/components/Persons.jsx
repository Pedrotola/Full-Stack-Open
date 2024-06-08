const Person = ( {name, number} ) =><li>{name} {number}</li>

const Persons = ({personsFilter}) => {
    console.log(personsFilter);
    return (
        <div>
          {personsFilter.map(person =>
            <Person key={person.id} name={person.name} number={person.number}/>
          )}
        </div>
    );
}

export default Persons;
