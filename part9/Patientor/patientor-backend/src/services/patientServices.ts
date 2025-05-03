import data from '../../data/patients';
import { NonSsnPatient, Patient } from '../type';

const getData = (): Patient[] => {
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

export default {
    getData,
    getNonSsnPatient
};