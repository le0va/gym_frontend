import { Link, useRouteError } from 'react-router-dom';
import Button from '../../components/ui/Button';
import HomeIcon from '@mui/icons-material/Home';
import './index.scss';

const Error = () => {
    const error: any = useRouteError();

    return (

        <div className="error-page__container">
            <h1>Упс!</h1>
            <p>Виникла непередбачена помилка</p>
            <p>
                <i>{error?.statusText || error?.message}</i>
            </p>
            <img src="./stitch_angry.jpg" className='stitch__img' alt='stitch-404'/>
            <Link to="/">
                <Button className='back__button'>
                    <HomeIcon sx={{ marginRight: '4px', height: '20px' }} />
                    Повернутися на головну
                </Button>
            </Link>
        </div >
    );
}

export default Error;