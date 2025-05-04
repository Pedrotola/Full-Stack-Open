import data from '../../data/patients';
import { v1 as uuid } from 'uuid';
import { NewPatient, NonSsnPatient, Patient } from '../type';

const getPatient = (): Patient[] => {
    return data;
};

const getNonSsnPatient = (): NonSsnPatient[] => {
    return data.map(({id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name, 
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...patient
    };
    data.push(newPatient);
    return newPatient;
};

export default {
    getPatient,
    getNonSsnPatient,
    addPatient
};