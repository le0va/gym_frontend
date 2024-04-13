import { useEffect } from "react";
import { observer } from "mobx-react";
import { IAccountSettingsStore } from "../../store/accountSettings.store";
import Form from "./Form";


interface AccountSettingsProps {
    store: IAccountSettingsStore;
}

const AccountSettings = ({ store }: AccountSettingsProps) => {

    useEffect(() => {
        store.setNameErr('');
        store.setRoomErr('');
        store.setFormErr('');
        store.setIsUpdateSuccess(null);

        const awaitFetchUserInfo = async () => {
            const userId = localStorage.getItem('userId') ?? -1;
            await store.fetchUserInfo(Number(userId));
        }
        awaitFetchUserInfo();
    }, []);

    return (
        <Form store={store} />
    );
}


export default observer(AccountSettings);