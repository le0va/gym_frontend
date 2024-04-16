import { forwardRef } from 'react';
import './switch.scss';

interface SwitchProps {
    isOn: boolean;
    handleToggle: () => void;
}

const Switch = forwardRef<HTMLLabelElement, SwitchProps>(({ isOn, handleToggle }, ref) => {

    return (
        <>
            <input
                className="react-switch-checkbox"
                checked={isOn}
                onChange={handleToggle}
                id={`react-switch-new`}
                type="checkbox"
            />
            <label
                ref={ref}
                style={{ backgroundColor: isOn ? 'rgb(0, 140, 255)' : 'rgba(255, 0, 0)' }}
                className="react-switch-label"
                htmlFor={`react-switch-new`}
            >
                <span className={`react-switch-button`} />
            </label>
        </>
    );
});

export default Switch;