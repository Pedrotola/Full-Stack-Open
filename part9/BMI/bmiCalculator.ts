import { isNotNumber } from "./utils";

interface bmiValues {
    value1: number,
    value2: number
}

const parseArguments = (args: string[]): bmiValues => {
    if (args.length > 4) throw new Error("Too many arguments");
    if (args.length < 4) throw new Error("Not enough arguments");

    if (!isNotNumber(args[2]) && !isNotNumber(args[3])) {
        return{
            value1: Number(args[2]),
            value2: Number(args[3])
        };
    }else {
        throw new Error("Provider values were not numbers!");        
    }  
};

export const calculateBmi = (height: number, weight: number): string => {
    const heightInMeters: number = height/100; 
    const BMI:number = weight / ( heightInMeters ** 2 );
    if (BMI < 18.5) {
        return `Underweight (unhealthy weight)`;
    } else if (BMI < 24.99) {
        return `Normal (healthy weight)`;
    } else if (BMI < 29) {
        return `Overweight (unhealthy weight)`;
    } else {
        return `Obese (unhealthy weight)`;
    }
};

//console.log(calculateBmi(180, 74))

if (require.main === module) {    
    try {
        const { value1, value2 } = parseArguments(process.argv);
        console.log(calculateBmi(value1, value2));
    } catch (error) {
        let errorMessage = 'Something went wrong: ';
        if (error instanceof Error) {
            errorMessage += error.message;
        }
        console.log(errorMessage);
    }
}