import { InputHTMLAttributes } from 'react';
import './input.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error: string;
}

const Input = ({ error, disabled, ...rest }: InputProps) => (
    <div className='form-input__container'>
        <input {...rest}
            disabled={disabled}
            className={`form-input__field ${disabled && 'form-input__disabled'}`}
        />
        {error && <div className='form-input__error'>{error}</div>}
    </div>
)

export default Input;