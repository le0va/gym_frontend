const setResponseError = (errorMessage: string, errorSetter: (error: string) => void, errors: Record<string, string>) => {

    const _errors = Object.fromEntries(
        Object.entries(errors).map(([key, value]) => (
            [key, 'Помилка: ' + value]
        ))
    );
    // console.log(_errors);

    const ERRORS: Record<string, string> = {..._errors, 
        'Internal Server Error: Internal server error': 'Виникла внутрішня помилка на сервері',
        'Failed to fetch': 'Виникла помилка при підключенні до сервера'
    };
    
    const clientError = ERRORS[errorMessage] ?? 'Помилка: Щось пішло не так';
    errorSetter(clientError);
}

export default setResponseError;