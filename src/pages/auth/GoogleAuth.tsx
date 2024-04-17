import { useLocation, useNavigate } from "react-router-dom";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { IGoogleAuthResponse, Role } from "../../types";
import setResponseError from "../../utils/setResponseError";


interface GoogleAuthProps {
    errorsList: Record<string, string>;
    setError: (error: string) => void;
    authenticateGoogle: (token: string) => Promise<IGoogleAuthResponse>;
}


const GoogleAuth = ({ errorsList, setError, authenticateGoogle }: GoogleAuthProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleSuccess = async (credentialResponse: CredentialResponse) => {
        try {
            const { id, accessToken, roles } = await authenticateGoogle(credentialResponse.credential ?? '');
            localStorage.setItem('userId', `${id}`);
            localStorage.setItem('accessToken', accessToken);
            // localStorage.setItem('roles', JSON.stringify(roles));

            const redirectedFrom = location.state?.from;
            const isUser = roles.includes(Role.user);

            const redirectPath = isUser ? (redirectedFrom || '/') : '/account-settings';
            const redirectState = (!isUser && redirectedFrom) ? { state: { from: redirectedFrom } } : undefined;
            navigate(redirectPath, redirectState);    // navigate for complete registration
        }
        catch (err: any) {
            setResponseError(err.message ?? '', setError, errorsList);
        }
    }

    const handleError = () => {
        setError('Виникла помилка під час авторизації, спробуйте використати інший гугл акаунт');
    }

    return (
        <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
        />
    );
}


export default GoogleAuth;