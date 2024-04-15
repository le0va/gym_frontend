import { IGetConfig, IPostConfig, IPatchConfig } from "../types";


class HttpService {
    baseUrl: string;

    constructor(baseUrl = 'https://gym14.kpi.in.ua/api') {
        this.baseUrl = baseUrl;
    }

    private getFullApiUrl(url: string) {
        return `${this.baseUrl}/${url}`;
    }

    private populateTokenToHeaderConfig(): Record<string, string> {
        return {
            'Authorization': 'Bearer ' + (localStorage.getItem('accessToken') ?? '')
        };
    }

    private throwErrorIfBadResponse(res: Response, resBody: any) {
        if (!res.ok) {
            throw new Error(`${res.statusText}: ${resBody.message}`);
        }
    }

    async get(url: string, config?: IGetConfig, withAuth = false) {
        let _config = { ...config };

        if (withAuth) {
            _config.headers = {
                ..._config?.headers,
                ...this.populateTokenToHeaderConfig()
            };
        }
        const response = await fetch(this.getFullApiUrl(url), _config);
        const result = await response.json();
        this.throwErrorIfBadResponse(response, result);

        return result;
    }

    async post(url: string, config: IPostConfig, withAuth = false) {
        if (withAuth) {
            config.headers = {
                ...config?.headers,
                ...this.populateTokenToHeaderConfig()
            };
        }
        const response = await fetch(this.getFullApiUrl(url), { method: 'POST', ...config });
        const result = await response.json();
        this.throwErrorIfBadResponse(response, result);

        return result;
    }

    async patch(url: string, config?: IPatchConfig, withAuth = true) {
        let _config = { ...config };

        if (withAuth) {
            _config.headers = {
                ..._config?.headers,
                ...this.populateTokenToHeaderConfig()
            }
        }
        const response = await fetch(this.getFullApiUrl(url), { method: 'PATCH', ..._config });
        const result = await response.json();
        this.throwErrorIfBadResponse(response, result);

        return result;
    }
}


export default HttpService;