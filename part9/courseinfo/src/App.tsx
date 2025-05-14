import type { JSX } from "react";

type CourseParts = {
  name: string,
  exerciseCount: number
}

type CourseProps = {
  courseParts: CourseParts[]
}

type HeaderProps = {
  name: string
}

type TotalProps = {
  total: number
}

const Total = (props: TotalProps): JSX.Element => {
  return(
    <div><p><strong>Number of exercises: </strong> {props.total}</p></div>
  )
}

const Content = ({courseParts}: CourseProps): JSX.Element => {
  return(
    <div>
      {
        courseParts.map((part, index)=> (
          <p key={index}> 
            {part.name} {part.exerciseCount}
          </p>
        ))
      }
    </div>
  )
}

const Header = (props: HeaderProps): JSX.Element => {
  return(
    <div><h1>{props.name}</h1></div>
  )
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total total={totalExercises} />
    </div>
  )
};

export default App;