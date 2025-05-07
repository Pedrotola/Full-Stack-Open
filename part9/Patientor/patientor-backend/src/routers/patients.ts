import express, { NextFunction, Request, Response }  from "express";
import { NewPatient, NonSsnPatient, Patient } from "../type";
import patientServices from "../services/patientServices";
import { newPatientSchema } from "../utils";
import { z } from "zod";

const router = express.Router();

router.get('/', (_req, res: Response<NonSsnPatient[]>) => {
    res.status(200).send(patientServices.getNonSsnPatient());
});

const newPatientParse = (req: Request, _res: Response, next: NextFunction) => {
    try {
        newPatientSchema.parse(req.body);
        next();
    } catch (error) {
        next(error);
    }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof z.ZodError) {
        res.status(400).send({ error: error.issues});
    }else{
        next();
    }
};

router.post('/', newPatientParse, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
   const addPatient = patientServices.addPatient(req.body);
   res.send(addPatient);
});

router.use(errorMiddleware);

export default router;