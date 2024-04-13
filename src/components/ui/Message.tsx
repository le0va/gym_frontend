import './message.scss';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface MessageProps {
    children: string;
    type: "error" | "success" | "info";
}

const Message = ({ children, type }: MessageProps) => {
    const className = type === 'error' ? 'error-message__container' :
        type === 'success' ? 'success-message__container' : 'info-message__container';

    return (
        <div className={className}>
            <p>
                {type === 'error' ? <CancelOutlinedIcon sx={{ paddingRight: '5px' }} /> :
                    type === 'success' ? <CheckCircleOutlineIcon sx={{ marginRight: '5px' }} /> :
                        <ErrorOutlineIcon sx={{ marginRight: '5px' }} />
                }
                {children}
            </p>
        </div>
    );
}

export default Message;