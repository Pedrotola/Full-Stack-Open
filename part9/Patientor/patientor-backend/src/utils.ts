import { Gender, NewPatient } from "./type";

const isString = (text: unknown): text is string => {
    return typeof text==='string' || text instanceof String;
};

const parseName = (name: unknown): string => {
    if (!isString(name) || name.trim().length < 1 ) {
        throw new Error("Incorrect or missing Name");        
    }
    return name;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error("Incorrect or missing Date: "+ date);
    }
    return date;
};

const isGender = (params: string): params is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(params);
};

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error("Incorrect or missing Gender: "+ gender);
    }
    return gender;
};

const parseSsn = (ssn: unknown): string => {
    if (!isString(ssn)) {
        throw new Error("Incorrect or missing ssn");        
    }
    return ssn;
};

const parseOccupation = (occupation: unknown): string => {
    if (!isString(occupation)|| occupation.trim().length < 1 ) {
        throw new Error("Incorrect or missing occupation");        
    }
    return occupation;
};

const toNewPatient = (object: unknown): NewPatient => {
    if (!object || typeof object !== 'object') {
        throw new Error("Incorrect or missind Data");
    }
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        const newPatient: NewPatient = {
            name: parseName(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation)
        };
        return newPatient;
    }
    throw new Error("Incorrect Data: Some fields missing.");    
};

export default toNewPatient;