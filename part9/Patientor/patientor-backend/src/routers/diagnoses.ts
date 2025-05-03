import { Response }  from "express";
import express from "express";
import { NonLatinDiagnosis } from "../type";
import diagnoseServices from "../services/diagnoseServices";

const router = express.Router();

router.get('/', (_req, res: Response<NonLatinDiagnosis[]>) => {
    res.status(200).send(diagnoseServices.getNonLatinDiagnosis());
});

export default router;