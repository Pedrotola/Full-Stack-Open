const Header = ({course}) => <h1>{course}</h1>

const Part = ({name, exercises}) => <p>{name} {exercises}</p>

const Content = ({parts}) =>  {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)}

const Total = ({parts}) =>{
    const total = parts.reduce((sum , part)=> sum+part.exercises, 0)
    return (<h4>total of {total} exercises</h4>)
}

const Course = ({courses})=> {
    return(
        <div>
            <Header course={courses.name}/>
            <Content parts={courses.parts}/>
            <Total parts={courses.parts}/>
        </div>
    )
}

export default Course