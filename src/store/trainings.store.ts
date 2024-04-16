import { observable, action, makeObservable } from "mobx";
import { MRT_PaginationState, MRT_SortingState } from "material-react-table";
import { IGetTrainingsOptions, IPaginationMeta, ITrainingSession, Order, OrderBy } from "../types";
import trainingsService, { ITrainingsService } from "../services/trainings.service";
import getTrainingsWithCorrectDate from "../utils/getTrainingWithCorrectDate";
import setResponseError from "../utils/setResponseError";


export enum TableOutputMethods {
    all = 'All',
    byDate = 'By date'
}


export interface ITrainingsStore {
    trainings: Array<ITrainingSession>;
    searchMRT: string;
    sortingMRT: MRT_SortingState;
    paginationMRT: MRT_PaginationState;
    filterDate: Date;
    tableOutputByDate: boolean;
    paginationMeta: IPaginationMeta;
    error: string;
    fetchTrainings: () => void;
    setTrainings: (trainings: Array<ITrainingSession>) => void;
    setSearchMRT: (search: string) => void;
    setSortingMRT: (sortig: MRT_SortingState) => void;
    setPaginationMRT: (pagination: MRT_PaginationState) => void;
    setFilterDate: (date: Date) => void;
    setTableOutputByDate: (isActive: boolean) => void;
    setPaginationMeta: (meta: IPaginationMeta) => void;
    setError: (error: string) => void;
}


class TrainingsStore implements ITrainingsStore {
    private readonly trainingsService: ITrainingsService;

    @observable trainings: Array<ITrainingSession> = [];
    @observable searchMRT = '';
    @observable filterDate = new Date();
    @observable tableOutputByDate = true;
    @observable error = '';
    @observable sortingMRT: MRT_SortingState = [{
        id: OrderBy.trainingStart,
        desc: true
    }];
    @observable paginationMRT: MRT_PaginationState = {
        pageIndex: 0,
        pageSize: 8
    }
    @observable paginationMeta = {
        page: 1,
        totalItems: 0,
        totalPages: 1,
        hasNextPage: false,
        hasPrevPage: false
    }

    constructor(trainingsService: ITrainingsService) {
        this.trainingsService = trainingsService;
        makeObservable(this);
    }

    @action
    async fetchTrainings() {
        try {
            const options: IGetTrainingsOptions = {
                search: this.searchMRT !== '' ? this.searchMRT : undefined,
                date: this.tableOutputByDate ? this.filterDate : undefined,
                page: this.tableOutputByDate ? 0 : this.paginationMRT.pageIndex,
                take: this.tableOutputByDate ? 300 : this.paginationMRT.pageSize,
                order: !this.tableOutputByDate && this.sortingMRT.length > 0 ? (this.sortingMRT[0].desc ? Order.DESC : Order.ASC) : Order.DESC,
                orderBy: !this.tableOutputByDate && this.sortingMRT.length > 0 && this.sortingMRT[0].id in OrderBy ? this.sortingMRT[0].id as OrderBy : OrderBy.trainingStart,
            };

            const { data: trainings, meta } = await this.trainingsService.getTrainings(options);
            const trainingWithCorrectDate = getTrainingsWithCorrectDate(trainings);
            this.setTrainings(trainingWithCorrectDate);
            this.setPaginationMeta(meta);
            this.setError('');
        }
        catch (err: any) {
            setResponseError(err.message ?? '', this.setError.bind(this), this.trainingsService.httpErrors);
        }
    }
    @action
    setTrainings(trainings: Array<ITrainingSession>) {
        this.trainings = trainings;
    }

    @action
    setSearchMRT(search: string) {
        this.searchMRT = search;
    }
    @action
    setSortingMRT(sortig: MRT_SortingState) {
        this.sortingMRT = sortig;
    }
    @action
    setPaginationMRT(pagination: MRT_PaginationState) {
        this.paginationMRT = pagination;
    }

    @action
    setFilterDate(date: Date) {
        this.filterDate = date;
    }
    @action
    setTableOutputByDate(isActive: boolean) {
        this.tableOutputByDate = isActive;
    }
    @action
    setPaginationMeta(meta: IPaginationMeta) {
        this.paginationMeta = meta;
    }

    @action
    setError(error: string) {
        this.error = error;
    }
}


const trainingsStore = new TrainingsStore(trainingsService);
export default trainingsStore;