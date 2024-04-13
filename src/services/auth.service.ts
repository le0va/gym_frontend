import HttpService from "./http.service";
import { IGoogleAuthResponse } from "../types";


export interface IAuthService {
    googleErrors: Record<string, string>;
    authenticateGoogle: (token: string) => Promise<IGoogleAuthResponse>;
}


class AuthService extends HttpService implements IAuthService {
    googleErrors: Record<string, string> = {
        'Bad Request: Google account is not linked to an email': 'Використаний Гугл акаунт не привʼязаний ні до якої пошти, спробуйте увійти через інший акаунт',
        'Bad Request: Error during google auth': 'Непередбачена помилка під час авторизації, спробуйте використати інший акаунт'
    };

    authenticateGoogle(token: string): Promise<IGoogleAuthResponse> {
        return this.post('auth/google', {
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                token
            })
        });
    }
}


const authService = new AuthService();
export default authService;