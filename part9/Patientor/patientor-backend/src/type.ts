//Diagnosis
export interface Diagnosis{
    code: string,
    name: string,
    latin?: string
}
// Omit latin
export type NonLatinDiagnosis = Omit<Diagnosis,'latin'>;
//Patient
export interface Patient{
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: string,
    occupation: string
}
//Omit "ssn": "090786-122X",
export type NonSsnPatient = Omit<Patient, 'ssn'>;