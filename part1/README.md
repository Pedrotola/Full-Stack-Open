# Ejercicios 1.1 - 1.14

## Envío de Soluciones

Envía tus soluciones a los ejercicios enviando primero tu código a GitHub y luego marcando los ejercicios completados en el sistema de envío de ejercicios.

- Recuerda, envía todos los ejercicios de una parte en una sola presentación. Una vez que hayas enviado tus soluciones para una parte, ya no podrás enviar más ejercicios a esa parte.
- Algunos de los ejercicios funcionan en la misma aplicación. En estos casos, es suficiente enviar solo la versión final de la aplicación. Si lo deseas, puedes realizar un commit después de cada ejercicio terminado, pero no es obligatorio.

## Ejercicios 1.1 - 1.5: Información del Curso

### Ejercicio 1.1: Información del Curso, paso 1

Modifica el componente `App` para que muestre información sobre el curso y partes:

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

### Ejercicio 1.2: Información del Curso, paso 2

Refactoriza el código del ejercicio anterior en nuevos componentes `Header`, `Content` y `Total`.

### Ejercicio 1.3: Información del Curso, paso 3

Usa objetos en lugar de variables sueltas:

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

### Ejercicio 1.4: Información del Curso, paso 4

Refactoriza los objetos en un array:

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

### Ejercicio 1.5: Información del Curso, paso 5

Cambia el curso y sus partes a un solo objeto JavaScript:

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

## Ejercicio 1.6: Unicafe, paso 1

Implementa una aplicación web para recopilar comentarios de los clientes con tres opciones: good (bueno), neutral y bad (malo). La aplicación debe mostrar el número total de comentarios recopilados para cada categoría. Tu aplicación final podría verse así:

```jsx
import { useState } from 'react';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      // código aquí
    </div>
  );
};

export default App;
```

## Ejercicio 1.7: Unicafe, paso 2

Amplía tu aplicación para que muestre más estadísticas sobre los comentarios recopilados: el número total de comentarios, la puntuación promedio y el porcentaje de comentarios positivos.

## Ejercicio 1.8: Unicafe, paso 3

Refactoriza tu aplicación para que la visualización de las estadísticas se extraiga en su propio componente `Statistics`. El estado de la aplicación debe permanecer en el componente raíz `App`.

## Ejercicio 1.9: Unicafe, paso 4

Cambia tu aplicación para mostrar estadísticas solo una vez que se hayan recopilado los comentarios.

## Ejercicio 1.10: Unicafe, paso 5

Extrae los componentes `Button` para los botones y `StatisticLine` para mostrar una única estadística. 

## Ejercicio 1.11*: Unicafe, paso 6

Muestra las estadísticas en una tabla HTML.

## Ejercicio 1.12*: Anecdotes, paso 1

Expande la siguiente aplicación agregando un botón para mostrar una anécdota aleatoria del campo de la ingeniería de software.

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

## Ejercicio 1.13*: Anecdotes, paso 2

Expande tu aplicación para que puedas votar por la anécdota mostrada. Almacena los votos de cada anécdota en un array u objeto en el estado del componente.

## Ejercicio 1.14*: Anecdotes, paso 3

Implementa la versión final de la aplicación que muestra la anécdota con el mayor número de votos. Si varias anécdotas empatan en el primer lugar, es suficiente con mostrar solo una de ellas.
