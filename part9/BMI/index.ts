/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exercisesCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }
  const bmi = calculateBmi(Number(height), Number(weight));
  res.status(200).json({
    height: Number(height),
    weight: Number(weight),
    bmi
  });
});

app.post('/exercises', (req, res) => {
    const body = req.body;
    const daily_exercises = body.daily_exercises;
    const target = body.target;
    if (!daily_exercises || !target) {
      res.status(400).json({ error: "parameters missing" });
      return;
    }

    if (isNaN(Number(target)) || !Array.isArray(daily_exercises)) {
      res.status(400).json({ error: "malformatted params" });
      return;
    }
    
    if (!daily_exercises.every((h: any) => !isNaN(Number(h)))) {
      res.status(400).json({ error: "malformatted params" });
      return;
    }

    const result = calculateExercises(daily_exercises, target);
    res.status(200).json(result);
});

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running in PORT ${PORT}`);
});