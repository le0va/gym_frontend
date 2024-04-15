import { useState } from "react";
import GoogleAuth from "./GoogleAuth";
import Message from "../../components/ui/Message";
import { IAuthService } from "../../services/auth.service";
import './index.scss';


interface AuthProps {
    service: IAuthService;
}


const Auth = ({ service }: AuthProps) => {
    const [error, setError] = useState('');

    return (
        <div className="auth__wrapper">
            <div className="container">
                {error && <Message type="error">{error}</Message>}

                <img src="./logo192.jpg" className="logo" alt="stitch-logo"/>
                <h1>Вхід до Gym14</h1>
                <div className="content">
                    <p>Для зручності користувачів авторизація виконується за допомогою сервіса Google</p>

                    <div className="google-wrapper">
                        <GoogleAuth
                            errorsList={service.googleErrors}
                            setError={setError}
                            authenticateGoogle={service.authenticateGoogle.bind(service)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Auth;