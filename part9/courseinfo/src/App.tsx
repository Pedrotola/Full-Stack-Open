import type { JSX } from "react";
import assertNever from "./helper";

type CoursePartBase = {
  name: string,
  exerciseCount: number
}

interface CoursePartDescription extends CoursePartBase {
  description: string
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number
  kind: "group"
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string,
  kind: "background"
}

interface CoursePartSpecial extends CoursePartDescription {
  requirements: string[],
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial

type CourseProps = {
  courseParts: CoursePart[]
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
        courseParts.map((part)=> {
          switch (part.kind) {
            case "basic":
              return(
                <div key={part.name}>
                  <p>
                    <strong>{part.name} {part.exerciseCount}</strong> <br />
                    <em>{part.description}</em>
                  </p>
                </div>
              );
            case "group":
              return(
              <div key={part.name}>
                <p>
                  <strong>{part.name} {part.exerciseCount}</strong> <br />
                  project exercises {part.groupProjectCount}
                </p>  
              </div>
              );
            case "background":
              return(
                <div key={part.name}>
                  <p><strong>{part.name} {part.exerciseCount}</strong> <br />
                  <em>{part.description}</em> <br />
                  submit to {part.backgroundMaterial}</p>
                </div>
              );
            case "special":
              return(
                <div key={part.name}>
                  <p><strong>{part.name} {part.exerciseCount}</strong><br />
                  <em>{part.description}</em><br />
                  required skills: {part.requirements.join(', ')}</p>
                </div>       
              );
            default:
              return assertNever(part);
          }
        })
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
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },{
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ]

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  courseParts.forEach(part => {
    switch (part.kind) {
      case "basic":
        console.log(part.name, part.description, part.exerciseCount);
        break;
      case "group":
        console.log(part.name, part.groupProjectCount, part.exerciseCount);
        break;
      case "background":
        console.log(part.name, part.description, part.exerciseCount);
        break;
      case "special":
        console.log(part.name, part.description, part.exerciseCount);
        break;
      default:
        return assertNever(part);
    }
  });

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total total={totalExercises} />
    </div>
  )
};

export default App;