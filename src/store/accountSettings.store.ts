import { action, makeObservable, observable } from "mobx";
import usersService, { IUsersService } from "../services/users.service";
import setResponseError from "../utils/setResponseError";


export interface IAccountSettingsStore {
    name: string;
    room: string;
    nameErr: string;
    roomErr: string;
    formErr: string;
    isUpdateSuccess: boolean | null;
    isUserNeedFillInfo: boolean;
    setName: (name: string) => void;
    setRoom: (room: string) => void;
    setNameErr: (err: string) => void;
    setRoomErr: (err: string) => void;
    setFormErr: (err: string) => void;
    setIsUpdateSuccess: (success: boolean | null) => void;
    setIsUserNeedFillInfo: (isUserNeedFillInfo: boolean) => void;
    fetchUserInfo: (userId: number) => void;
    updateUserInfo: () => void;
}


class AccountSettingsStore implements IAccountSettingsStore {
    private readonly usersService: IUsersService;

    @observable name = '';
    @observable room = '';
    @observable nameErr = '';
    @observable roomErr = '';
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
            const { name, room } = await usersService.fetchUser(userId);
            console.log('Name: ' + name + '; Room = ' + room);
            this.setName(name ?? '');
            this.setRoom(`${room ?? '0'}`);
            this.setIsUserNeedFillInfo(this.name !== '' && this.room !== '' ? false : true);
            console.log('Is User need Fill info: ' + this.isUserNeedFillInfo);
        }
        catch (err: any) {
            setResponseError(err.message ?? '', this.setFormErr.bind(this), usersService.httpErrors);
        }
    }

    @action
    async updateUserInfo() {
        this.setIsUpdateSuccess(null);
        const nameErr = /^[\u0410-\u044f\u0401\u0451\u0406\u0456\u0404\u0454'ʼ`]+$/.test(this.name) ? '' : 'Фамілія має містити лише кирилицю';
        const roomErr = /^0$|^\d{3}$/.test(this.room) ? '' : 'Номер кімнати має містити лише трьохзначні числа, або 0 якщо ви проживаєте в іншому гуртожитку';
        this.setNameErr(nameErr);
        this.setRoomErr(roomErr);

        if (!nameErr && !roomErr) {
            try {
                const updateResult = await usersService.update({ name: this.name, room: Number(this.room) });
                localStorage.setItem('accessToken', updateResult.accessToken);
                localStorage.setItem('roles', JSON.stringify(updateResult.roles));
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
    setName(name: string) {
        this.name = name;
    }
    @action
    setRoom(room: string) {
        this.room = room;
    }
    @action
    setNameErr(err: string) {
        this.nameErr = err;
    }
    @action
    setRoomErr(err: string) {
        this.roomErr = err;
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