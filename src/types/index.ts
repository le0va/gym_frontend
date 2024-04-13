export enum Order {
    ASC = 'ASC',
    DESC = 'DESC'
}

export enum Role {
    guest = 'guest',
    user = 'user'
}

export enum OrderBy {
    userName = 'userName',
    room = 'room',
    trainingStart = 'trainingStart',
    trainingEnd = 'trainingEnd'
}

export interface IUser {
    id: number;
    name: string | null;
    room: number | null;
    roles: Role[];
    isUserTraining: boolean;
}

export interface ITrainingUser {
    id: number;
    room: number;
    name: string;
    trainingStart: Date;
}

export interface IUserInfo {
    room: number | null;
    name: string | null;
}

export interface UpdateUserDto {
    name?: string;
    room?: number;
}

export interface ITrainingSession {
    id: number;
    start: Date;
    end: Date;
    user: {
        name: string;
        room: number;
    }
}

export interface IGetTrainingsOptions {
    search?: string;
    date?: Date;
    order?: Order;
    orderBy?: OrderBy;
    page?: number;
    take?: number;
}

export interface IGetTrainingsResponse {
    data: ITrainingSession[];
    meta: IPaginationMeta;
}

export interface IPaginationMeta {
    page: number;
    // take: number;
    totalItems: number;
    totalPages: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
}

export interface IGoogleAuthResponse {
    id: number;
    accessToken: string;
    roles: Role[];
    isUserTraining: boolean;
    room: number | null;
    name: string | null;
}

export interface IGetConfig {
    headers?: Record<string, string>;
}
export interface IPostConfig extends IGetConfig {
    body: string;
}
export interface IPatchConfig extends IGetConfig {
    body?: string;
}