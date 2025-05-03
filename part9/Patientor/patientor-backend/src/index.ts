import express from 'express';
import cors from 'cors';

import diagnosesRouter from './routers/diagnoses';
import patientsRouter from './routers/patients';

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    console.log('Pong');
    res.send('pong!');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, ()=> {
    console.log(`Server running in PORT ${PORT}`);    
});