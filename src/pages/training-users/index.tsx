import { observer } from "mobx-react";
import { useEffect } from "react";
import { ITrainingUsersStore } from "../../store/trainingUsers.store";
import { IUsersService } from "../../services/users.service";
import UsersTable from "./UsersTable";
import Message from "../../components/ui/Message";
import TrainingControlButton from "./TrainingControlButton";
import ProtectedComponent from "../../navigation/ProtectedComponent";
import isUserAuthorized from "../../utils/isUserAuthorized";
import './index.scss';


interface TrainingUsersProps {
    store: ITrainingUsersStore;
    service: IUsersService;
}


const TrainingUsers = ({ store, service }: TrainingUsersProps) => {

    useEffect(() => {
        store.setError('');
        store.fetchTrainingUsers();
        if (isUserAuthorized()) {
            const userId = localStorage.getItem('userId');
            store.fetchUserInfo(Number(userId));
        }
    }, []);

    return (
        <div className="training-users__container">
            {store.error && <Message type="error">{store.error}</Message>}
            <div>
                <UsersTable data={store.trainingUsers} />

                <ProtectedComponent redirectTo="/login" condition={isUserAuthorized()}>
                    <ProtectedComponent redirectTo="/account-settings" condition={store.isUserAuthorizedToTraining}>
                        <TrainingControlButton
                            isUserTraining={store.isUserTraining}
                            errors={service.httpErrors}
                            errorSetter={store.setError.bind(store)}
                            startTraining={service.startTraining.bind(service)}
                            finishTraining={service.finishTraining.bind(service)}
                            setIsUserTraining={store.setIsUserTraining.bind(store)}
                            onTrainingStateChange={store.fetchTrainingUsers.bind(store)}
                        />
                    </ProtectedComponent>
                </ProtectedComponent>
            </div>
        </div>
    );
}


export default observer(TrainingUsers);