const Header = (course) =>{
  return (
    <div>
      <h1>
        {course.course}
      </h1>
    </div>
  )
}

const Part = (content) =>{
  return(
    <div>
      <p>{content.name} {content.exercises}</p>
    </div>
  )
}

const Content = (content) =>{
  return(
    <div>
      <Part name={content.content[0].name} exercises={content.content[0].exercises}/>
      <Part name={content.content[1].name} exercises={content.content[1].exercises}/>
      <Part name={content.content[2].name} exercises={content.content[2].exercises}/>
    </div>
  )
}

const Total = (total) =>{
  let sumtotal = total.total[0].exercises + total.total[1].exercises + total.total[2].exercises
  return(
    <div>
      <p>Total of Exercises {sumtotal}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content content={course.parts}/>
      <Total total={course.parts}/>
    </div>
  )
}

export default App