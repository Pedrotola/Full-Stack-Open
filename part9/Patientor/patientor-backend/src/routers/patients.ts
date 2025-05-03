import express, { Response }  from "express";
import { NonSsnPatient } from "../type";
import patientServices from "../services/patientServices";

const router = express.Router();

router.get('/', (_req, res: Response<NonSsnPatient[]>) => {
    res.status(200).send(patientServices.getNonSsnPatient());
});

export default router;