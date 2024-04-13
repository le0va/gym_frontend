import classNames from 'classnames';
import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Button from '../../components/ui/Button';
import './datepicker.scss';


interface DatePickerProps {
    className?: string;
    currentDate: Date;
    setCurrentDate: (date: Date) => void; 
}


const Datepicker = ({ currentDate, setCurrentDate, className = '' }: DatePickerProps) => {

    const handleSetPreviousDay = () => {
        const previousDay = new Date(currentDate);
        previousDay.setDate(previousDay.getDate() - 1);
        setCurrentDate(previousDay);
    }

    const handleSetNextDay = () => {
        const nextDay = new Date(currentDate);
        nextDay.setDate(nextDay.getDate() + 1);
        setCurrentDate(nextDay);
    }

    const handleDatepickerChange = (value: dayjs.Dayjs | null) => {
        if (value) {
            setCurrentDate(value.toDate());
        }
    }

    return (
        <div className={classNames(className, 'datepicker__container')} >
            <Button
                className='arrow__container'
                onClick={handleSetPreviousDay}
            >
                <ArrowBackIosNewIcon className="arrow" />
            </Button>

            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='uk'>
                <DatePicker
                    className="datepicker"
                    format='DD/MM/YYYY'
                    value={dayjs(currentDate)}
                    onChange={handleDatepickerChange}
                />
            </LocalizationProvider>

            <Button
                className='arrow__container'
                onClick={handleSetNextDay}
            >
                <ArrowForwardIosIcon className="arrow" />
            </Button>
        </div>
    );
}


export default Datepicker;