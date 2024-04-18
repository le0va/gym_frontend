import HttpService from "./http.service";
import { ITrainingUser, IUser, Role, UpdateUserDto } from "../types";


export interface IUsersService {
    httpErrors: Record<string, string>;
    fetchUser(id: number): Promise<IUser>;
    fetchTrainingUsers(): Promise<Array<ITrainingUser>>;
    startTraining(): Promise<Date>;
    finishTraining(): Promise<void>;
    update(updateData: UpdateUserDto): Promise<{ accessToken: string }>;
}


class UsersService extends HttpService implements IUsersService {
    httpErrors: Record<string, string> = {
        'Bad Request: Wrong filter passed to request': 'Поганий запит від клієнта, переданого фільтра не існує',
        'Bad Request: The user already started training': 'Користувач вже почав тренування',
        'Bad Request: The user is currently not training': 'Користувач ще не починав тренування',
        'Unauthorized: Unauthorized': 'Помилка авторизації. Увійдіть в свій акаунт',
        'Forbidden: Forbidden resource': 'Заповніть поля "Імʼя", "Гуртожиток" і "Номер кімнати" на сторінці налаштувань акаунту щоб отримати доступ до керування тренуваннями',
        'Not Found: User with this id does not exist': 'Повторно увійдіть в свій акаунт на сторінці авторизації, користувача з заданим id не знайдено',
        'Too Many Requests: You can complete no more than 3 training sessions in the last hour': 'Забагато запитів. За одну годину можна починати максимум три тренування'
    };

    fetchUser(id: number): Promise<IUser> {
        return this.get(`users/${id}`);
    }

    fetchTrainingUsers(): Promise<Array<ITrainingUser>> {
        return this.get('users?filter=training');
    }

    startTraining(): Promise<Date> {
        return this.patch('training/start');
    }

    finishTraining(): Promise<void> {
        return this.patch('training/finish');
    }

    update(updateData: UpdateUserDto): Promise<{ accessToken: string }> {
        return this.patch('users', {
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                ...updateData
            })
        }, true);
    }
}


const usersService = new UsersService();
export default usersService;