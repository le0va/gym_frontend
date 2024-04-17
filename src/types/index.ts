export enum Order {
    ASC = 'ASC',
    DESC = 'DESC'
}

export enum Role {
    guest = 'guest',
    user = 'user'
}

export enum OrderBy {
    hostel = 'hostel',
    room = 'room',
    userName = 'userName',
    trainingStart = 'trainingStart',
    trainingEnd = 'trainingEnd'
}

export interface IUser {
    id: number;
    hostel: number | null;
    room: number | null;
    name: string | null;
    roles: Role[];
    isUserTraining: boolean;
}

export interface ITrainingUser {
    id: number;
    hostel: number;
    room: number;
    name: string;
    trainingStart: Date;
}

export interface IUserInfo {
    hostel: number | null;
    room: number | null;
    name: string | null;
}

export interface UpdateUserDto {
    hostel?: number;
    room?: number;
    name?: string;
}

export interface ITrainingSession {
    id: number;
    start: Date;
    end: Date;
    user: {
        hostel: number;
        room: number;
        name: string;
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
    hostel: number | null;
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