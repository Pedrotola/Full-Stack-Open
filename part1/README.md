# Exercises 1.1 - 1.14

## Solution Submission

Submit your solutions to the exercises by first pushing your code to GitHub and then marking the exercises as completed in the exercise submission system.

- Remember, submit all the exercises for a part in a single submission. Once you have submitted your solutions for a part, you will no longer be able to submit more exercises for that part.
- Some exercises work in the same application. In these cases, it is enough to submit only the final version of the application. If you wish, you can commit after each completed exercise, but it is not mandatory.

## Exercises 1.1 - 1.5: Course Information

### Exercise 1.1: Course Information, Step 1

Modify the `App` component to display information about the course and parts:

```jsx
const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  return (
    <div>
      <h1>{course}</h1>
      <p>{part1} {exercises1}</p>
      <p>{part2} {exercises2}</p>
      <p>{part3} {exercises3}</p>
    </div>
  );
};

export default App;
```

### Exercise 1.2: Course Information, Step 2

Refactor the code from the previous exercise into new components `Header`, `Content`, and `Total`.

### Exercise 1.3: Course Information, Step 3

Use objects instead of loose variables:

```jsx
const App = () => {
  const course = 'Half Stack application development';
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  };
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  };
  const part3 = {
    name: 'State of a component',
    exercises: 14
  };

  return (
    <div>
      <Header course={course} />
      <Content parts={[part1, part2, part3]} />
      <Total parts={[part1, part2, part3]} />
    </div>
  );
};

```

### Exercise 1.4: Course Information, Step 4

Refactor the objects into an array:

```jsx
const App = () => {
  const course = 'Half Stack application development';
  const parts = [
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
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};
```

### Exercise 1.5: Course Information, Step 5

Change the course and its parts to a single JavaScript object:

```jsx
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
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};
```

## Exercise 1.6: Unicafe, Step 1

Implement a web application to collect customer feedback with three options: good, neutral, and bad. The application should display the total number of feedback collected for each category. Your final application might look like this:

```jsx
import { useState } from 'react';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      // code here
    </div>
  );
};

export default App;
```

## Exercise 1.7: Unicafe, Step 2

Extend your application to show more statistics about the feedback collected: the total number of feedback, the average score, and the percentage of positive feedback.

## Exercise 1.8: Unicafe, Step 3

Refactor your application so that the display of statistics is extracted into its own `Statistics` component. The state of the application should remain in the root `App` component.

## Exercise 1.9: Unicafe, Step 4

Change your application to show statistics only once feedback has been collected.

## Exercise 1.10: Unicafe, Step 5

Extract `Button` components for the buttons and `StatisticLine` for displaying a single statistic.

## Exercise 1.11*: Unicafe, Step 6

Display the statistics in an HTML table.

## Exercise 1.12*: Anecdotes, Step 1

Expand the following application by adding a button to show a random anecdote from the field of software engineering.

```jsx
import { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  const [selected, setSelected] = useState(0);

  return (
    <div>
      {anecdotes[selected]}
    </div>
  );
};

export default App;
```

## Exercise 1.13*: Anecdotes, Step 2

Expand your application to allow voting for the displayed anecdote. Store the votes for each anecdote in an array or object in the component state.

## Exercise 1.14*: Anecdotes, Step 3

Implement the final version of the application that displays the anecdote with the highest number of votes. If several anecdotes tie for first place, it is sufficient to display only one of them.