import { isNotNumber } from "./utils";

type Rating = 1 | 2 | 3

interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: Rating,
    ratingDescription: string,
    target: number,
    average: number
}

interface exerciseValues {
    targetArg: number,
    hoursArg: number[],
}

const parseArgument = (args: string[]): exerciseValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    //if (args.length > 10) throw new Error('Too many arguments');
    const targetArg = Number(process.argv[2]);
    const hoursArg = process.argv.slice(3);
    if (isNotNumber(targetArg) && !hoursArg.some(h => isNotNumber(Number(h)))) {
        return{
            targetArg,
            hoursArg: hoursArg.map(Number)
        };        
    }else{
        throw new Error('Provided values were not numbers!');
    }
};

export const calculateExercises = (exercisesHours: number[], target: number): Result => {
    const totalHours:number = exercisesHours.reduce((sum, hour) => sum+=hour, 0);

    const periodLength: number = exercisesHours.length;
    const trainingDays: number = exercisesHours.filter( eH => eH > 0).length;
    const average: number = totalHours / exercisesHours.length;
    const success: boolean = target <= average;

    let rating: Rating = 1;
    let ratingDescription: string = '';

    if (target <= average) {
        rating = 3;
        ratingDescription = 'Completed!, you are the best';
    } else if (target * 0.75 <= average) {
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    } else {
        rating = 1;
        ratingDescription = 'You should improve for the next one.';
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

//console.log(calculateExercises([0, 0, 2, 0, 0, 3, 1], 2)) //Example to use

if (require.main === module) {    
    try {
        const { targetArg, hoursArg } = parseArgument(process.argv);
        console.log(calculateExercises(hoursArg, targetArg));
    } catch (error) {
        let errorMessage = 'Something went wrong: ';
        if (error instanceof Error) {
            errorMessage += error.message;
        }
        console.log(errorMessage);
    }
}