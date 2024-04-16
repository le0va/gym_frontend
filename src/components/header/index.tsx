import { Link, useLocation } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './header.scss';


const Header = () => {
    const location = useLocation();

    return (
        <header className="app__header">
            <div className="tabs">
                <Link to={'/training-users'}>
                    <button className={location.pathname === '/training-users' ? 'active' : ''}>
                        Тренуються
                    </button>
                </Link>
                <Link to={'/trainings-history'}>
                    <button className={location.pathname === '/trainings-history' ? 'active' : ''}>
                        Історія
                    </button>
                </Link>
            </div>
            <Link to={'/account-settings'} className={location.pathname === '/account-settings' || location.pathname === '/login' ? 'account active' : 'account'}>
                <AccountCircleIcon fontSize='large' />
            </Link>
        </header>
    )
}


export default Header;