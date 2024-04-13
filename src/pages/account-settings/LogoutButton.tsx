import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import './logoutButton.scss';


const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('roles');
        navigate('/login');
    }

    return (
        <Button className="logout__button" type="button" onClick={handleLogout}>Вийти</Button>
    );
}


export default LogoutButton;