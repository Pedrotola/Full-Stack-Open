import express, { Response }  from "express";
import { NonSsnPatient } from "../type";
import patientServices from "../services/patientServices";
import toNewPatient from "../utils";

const router = express.Router();

router.get('/', (_req, res: Response<NonSsnPatient[]>) => {
    res.status(200).send(patientServices.getNonSsnPatient());
});

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);
        const addPatient = patientServices.addPatient(newPatient);
        res.json(addPatient);
    } catch (error) {
        let errorMessage = 'Something is wrong. ';
        if (error instanceof Error) errorMessage += 'Error: ' + error.message;
        res.status(400).send(errorMessage);
    }
});

export default router;