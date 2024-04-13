import { observable, action, makeObservable } from "mobx";
import usersService, { IUsersService } from "../services/users.service";
import { ITrainingUser, Role } from "../types";
import setResponseError from "../utils/setResponseError";


export interface ITrainingUsersStore {
    isUserAuthorizedToTraining: boolean;
    isUserTraining: boolean;
    trainingUsers: Array<ITrainingUser>;
    error: string;
    fetchUserInfo: (userId: number) => void;
    fetchTrainingUsers: () => void;
    setIsUserAuthorizedToTraining: (isUserAuthorizedToTraining: boolean) => void;
    setIsUserTraining: (isUserTraining: boolean) => void;
    setTrainingUsers: (trainingUsers: ITrainingUser[]) => void;
    setError: (error: string) => void;
}


class TrainingUsersStore implements ITrainingUsersStore {
    private readonly usersService: IUsersService;

    @observable isUserAuthorizedToTraining: boolean = false;
    @observable isUserTraining: boolean = false;
    @observable trainingUsers: Array<ITrainingUser> = [];
    @observable error = '';

    constructor(usersService: IUsersService) {
        this.usersService = usersService;
        makeObservable(this);
    }

    @action
    async fetchUserInfo(userId: number) {
        try {
            const { roles, isUserTraining } = await usersService.fetchUser(userId);
            this.setIsUserAuthorizedToTraining(roles.includes(Role.user));
            this.setIsUserTraining(isUserTraining);
        }
        catch (err: any) {
            setResponseError(err.message ?? '', this.setError.bind(this), usersService.httpErrors);
        }
    }

    @action
    async fetchTrainingUsers() {
        try {
            const trainingUsers = await usersService.fetchTrainingUsers();
            const usersWithCorrectDate = trainingUsers.map(user => ({ ...user, trainingStart: new Date(user.trainingStart) }));
            this.setTrainingUsers(usersWithCorrectDate);
        }
        catch (err: any) {
            setResponseError(err.message ?? '', this.setError.bind(this), usersService.httpErrors);
        }
    }

    @action
    setIsUserAuthorizedToTraining(isUserAuthorizedToTraining: boolean) {
        this.isUserAuthorizedToTraining = isUserAuthorizedToTraining;
    }
    @action
    setIsUserTraining(isUserTraining: boolean) {
        this.isUserTraining = isUserTraining;
    }
    @action
    setTrainingUsers(trainingUsers: Array<ITrainingUser>) {
        this.trainingUsers = trainingUsers;
    }
    @action
    setError(error: string) {
        this.error = error;
    }
}


const trainingUsersStore = new TrainingUsersStore(usersService);
export default trainingUsersStore;