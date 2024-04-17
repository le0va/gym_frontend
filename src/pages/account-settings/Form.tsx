import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { IAccountSettingsStore } from '../../store/accountSettings.store';
import Input from '../../components/ui/Input';
import SubmitButton from './SubmitButton';
import EditButton from './EditButton';
import LogoutButton from './LogoutButton';
import Message from '../../components/ui/Message';
import './form.scss';


interface FormProps {
    store: IAccountSettingsStore;
}

const Form = ({ store }: FormProps) => {
    const [isEditModeActive, setIsEditModeActive] = useState(store.isUserNeedFillInfo);

    useEffect(() => {
        setIsEditModeActive(store.isUserNeedFillInfo);
    }, [store.isUserNeedFillInfo])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await store.updateUserInfo();
        if (store.isUpdateSuccess) {
            setIsEditModeActive(false);
        }
    }

    return (
        <div className="account-settings__wrapper">
            <div className="container">
                {store.formErr && <Message type="error">{`Помилка: ${store.formErr}`}</Message>}
                {store.isUpdateSuccess && <Message type="success">Інформація профіля успішно збережена!</Message>}
                {store.isUserNeedFillInfo && <Message type="info">Заповніть інформацію про користувача щоб отримати доступ до тренувань</Message>}

                <div className="form__container">
                    <form onSubmit={handleSubmit}>
                        <h1>Налаштування профіля</h1>
                        <label htmlFor="name">
                            Фамілія
                        </label>
                        <Input
                            id="name"
                            value={store.name}
                            onChange={e => store.setName(e.target.value)}
                            error={store.nameErr}
                            disabled={!isEditModeActive}
                        />
                        <label htmlFor="hostel">
                            Гуртожиток
                        </label>
                        <Input
                            id="hostel"
                            value={store.hostel}
                            onChange={e => store.setHostel(e.target.value)}
                            error={store.hostelErr}
                            disabled={!isEditModeActive}
                        />
                        <label htmlFor="room">
                            Кімната
                        </label>
                        <Input
                            id="room"
                            value={store.room}
                            onChange={e => store.setRoom(e.target.value)}
                            error={store.roomErr}
                            disabled={!isEditModeActive}
                        />
                        <div className="footer">
                            {isEditModeActive ?
                                <SubmitButton /> :
                                <EditButton enableEditMode={() => setTimeout(() => setIsEditModeActive(true), 20)} />
                            }
                            <LogoutButton />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}


export default observer(Form);