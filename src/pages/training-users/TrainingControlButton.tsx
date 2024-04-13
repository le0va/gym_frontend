import Button from "../../components/ui/Button";
import setResponseError from "../../utils/setResponseError";
import './trainingControlButton.scss';


interface TrainingControlButtonProps {
    isUserTraining: boolean;
    errors: Record<string, string>;
    errorSetter: (error: string) => void;
    startTraining: () => void;
    finishTraining: () => void;
    setIsUserTraining: (isUserTraining: boolean) => void;
    onTrainingStateChange?: () => void;
}


const TrainingControlButton = ({
    isUserTraining,
    errors,
    errorSetter,
    startTraining,
    finishTraining,
    setIsUserTraining,
    onTrainingStateChange = () => { }
}: TrainingControlButtonProps) => {

    const handleStartTraining = async () => {
        try {
            await startTraining();
            setIsUserTraining(true);
            onTrainingStateChange();
        }
        catch (err: any) {
            setResponseError(err.message ?? '', errorSetter, errors);
        }
    }

    const handleFinishTraining = async () => {
        try {
            await finishTraining();
            setIsUserTraining(false);
            onTrainingStateChange();
        }
        catch (err: any) {
            setResponseError(err.message ?? '', errorSetter, errors);
        }
    }

    return (
        <Button
            className={`training-control__${isUserTraining ? 'finish' : 'start'}-button trainings-control__button`}
            onClick={isUserTraining ? handleFinishTraining : handleStartTraining}
            >
            {isUserTraining ? 'Завершити тренування' : 'Почати тренування'}
        </Button>
    );
};


export default TrainingControlButton;