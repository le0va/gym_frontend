import { action, makeObservable, observable } from "mobx";
import usersService, { IUsersService } from "../services/users.service";
import setResponseError from "../utils/setResponseError";


export interface IAccountSettingsStore {
    hostel: string;
    room: string;
    name: string;
    hostelErr: string;
    roomErr: string;
    nameErr: string;
    formErr: string;
    isUpdateSuccess: boolean | null;
    isUserNeedFillInfo: boolean;
    setHostel: (hostel: string) => void;
    setRoom: (room: string) => void;
    setName: (name: string) => void;
    setHostelErr: (err: string) => void;
    setRoomErr: (err: string) => void;
    setNameErr: (err: string) => void;
    setFormErr: (err: string) => void;
    setIsUpdateSuccess: (success: boolean | null) => void;
    setIsUserNeedFillInfo: (isUserNeedFillInfo: boolean) => void;
    fetchUserInfo: (userId: number) => void;
    updateUserInfo: () => void;
}


class AccountSettingsStore implements IAccountSettingsStore {
    private readonly usersService: IUsersService;

    @observable hostel = '';
    @observable room = '';
    @observable name = '';
    @observable hostelErr = '';
    @observable roomErr = '';
    @observable nameErr = '';
    @observable formErr = '';
    @observable isUpdateSuccess: boolean | null = null;
    @observable isUserNeedFillInfo: boolean = false;

    constructor(usersService: IUsersService) {
        this.usersService = usersService;
        makeObservable(this);
    }

    @action
    async fetchUserInfo(userId: number) {
        try {
            const { hostel, room, name } = await usersService.fetchUser(userId);
            this.setHostel(`${hostel ?? ''}`);
            this.setRoom(`${room ?? ''}`);
            this.setName(name ?? '');
            this.setIsUserNeedFillInfo(this.hostel !== '' && this.room !== '' && this.name !== '' ? false : true);
        }
        catch (err: any) {
            setResponseError(err.message ?? '', this.setFormErr.bind(this), usersService.httpErrors);
        }
    }

    @action
    async updateUserInfo() {
        this.setIsUpdateSuccess(null);
        const hostelErr = Number(this.hostel) >= 1 && Number(this.hostel) <= 22 ? '' : 'Номер гуртожитка має містити число від 1 до 22';
        const roomErr = /^\d{3}$/.test(this.room) ? '' : 'Номер кімнати має містити лише трьохзначні числа';
        const nameErr = /^[\u0410-\u044f\u0401\u0451\u0406\u0456\u0404\u0454'ʼ`]+$/.test(this.name) ? '' : 'Фамілія має містити лише кирилицю';

        this.setHostelErr(hostelErr);
        this.setRoomErr(roomErr);
        this.setNameErr(nameErr);

        if (!hostelErr && !roomErr && !nameErr) {
            try {
                const updateResult = await usersService.update({ hostel: Number(this.hostel), room: Number(this.room), name: this.name });
                localStorage.setItem('accessToken', updateResult.accessToken);
                this.setFormErr('');
                this.setIsUserNeedFillInfo(false);
                this.setIsUpdateSuccess(true);
            }
            catch (err: any) {
                setResponseError(err.message ?? '', this.setFormErr, usersService.httpErrors);
                this.setIsUpdateSuccess(false);
            }
        }
    }

    @action
    setHostel(hostel: string) {
        this.hostel = hostel;
    }
    @action
    setRoom(room: string) {
        this.room = room;
    }
    @action
    setName(name: string) {
        this.name = name;
    }
    @action
    setHostelErr(err: string) {
        this.hostelErr = err;
    }
    @action
    setRoomErr(err: string) {
        this.roomErr = err;
    }
    @action
    setNameErr(err: string) {
        this.nameErr = err;
    }
    @action
    setFormErr(err: string) {
        this.formErr = err;
    }
    @action
    setIsUpdateSuccess(success: boolean | null) {
        this.isUpdateSuccess = success;
    }
    @action
    setIsUserNeedFillInfo(isUserNeedFillInfo: boolean) {
        this.isUserNeedFillInfo = isUserNeedFillInfo;
    }
}


const accountSettingsStore = new AccountSettingsStore(usersService);
export default accountSettingsStore;