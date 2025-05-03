import data from '../../data/diagnoses';
import { Diagnosis, NonLatinDiagnosis } from '../type';

const getData = (): Diagnosis[] => {
    return data;
};

const getNonLatinDiagnosis = (): NonLatinDiagnosis[] => {
    return data.map(({code, name}) => ({
        code,
        name
    }));
};

export default{
    getData,
    getNonLatinDiagnosis
};