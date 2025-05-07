import { Gender, NewPatient } from "./type";
import { z } from "zod";

export const newPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string()
});

export const toNewPatient = (obj: unknown): NewPatient => {
    return newPatientSchema.parse(obj);
};