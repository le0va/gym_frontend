import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';
import classNames from 'classnames';
import './button.scss';


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: string | ReactNode;
}


const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, className = '', onClick, type }: ButtonProps, ref) => {

        const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            if (onClick) {
                onClick(e);
            }
        }

        return (
            <button ref={ref} onClick={handleClick} className={classNames(className, 'button')} type={type}>
                {children}
            </button>
            
        );
    }
);


export default Button;
