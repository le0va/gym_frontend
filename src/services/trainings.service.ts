import HttpService from "./http.service";
import { IGetTrainingsOptions } from "../types";
import { IGetTrainingsResponse } from "../types";


export interface ITrainingsService {
    httpErrors: Record<string, string>;
    getTrainings: (options?: IGetTrainingsOptions) => Promise<IGetTrainingsResponse>;
}


class TrainingsService extends HttpService implements ITrainingsService {
    httpErrors: Record<string, string> = {
        'Bad Request: Requested page is out of range': 'Поганий запит від клієнта, запитувана сторінка знаходиться поза межами діапазону'
    };

    getTrainings(options?: IGetTrainingsOptions): Promise<IGetTrainingsResponse> {
        const { search, date, order, orderBy, page, take } = options ?? {};
        let url = 'training?';

        url += search ? `search=${search}&` : '';
        url += date ? `date=${encodeURIComponent(date.toISOString())}&` : '';
        url += order ? `order=${order}&` : '';
        url += orderBy ? `orderBy=${orderBy}&` : '';
        url += page !== undefined ? `page=${page}&` : '';
        url += take !== undefined ? `take=${take}&` : '';

        return this.get(url);
    }
}


const trainingsService = new TrainingsService();
export default trainingsService;