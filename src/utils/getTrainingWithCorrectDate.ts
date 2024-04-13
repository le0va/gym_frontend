import { ITrainingSession } from "../types";

const getTrainingsWithCorrectDate = (trainings: ITrainingSession[]) => {

    return trainings.map(training => ({ ...training, start: new Date(training.start), end: new Date(training.end) }));
}

export default getTrainingsWithCorrectDate;