import { useEffect, useState } from "react";
import GoogleAuth from "./GoogleAuth";
import Message from "../../components/ui/Message";
import { IAuthService } from "../../services/auth.service";
import './index.scss';


interface AuthProps {
    service: IAuthService;
}


const Auth = ({ service }: AuthProps) => {
    const [error, setError] = useState('');

    useEffect(() => {
        setError('');
    })

    return (
        <div className="auth__wrapper">
            <div className="container">
                {error && <Message type="error">{error}</Message>}

                <img src="./stitch_circle.png" className="logo" />
                <h1>Вхід до GymBro</h1>
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