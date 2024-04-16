import React, { ReactElement, useEffect, useRef, useState } from "react";
import './dropdown.scss';
import classNames from "classnames";


interface DropdownProps {
    children: ReactElement;
    trigger: ReactElement;
    className?: string;
    onDropdownClick?: (e: React.MouseEvent, isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>>) => void;
}


const Dropdown = ({ trigger, children, className = '', onDropdownClick }: DropdownProps) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if ((dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) &&
                (triggerRef.current && !triggerRef.current.contains(e.target as Node))) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleToggleDropdown = (e: React.MouseEvent) => {
        setOpen(!open);
    }

    const handleDropdownClick = (e: React.MouseEvent) => {
        if (onDropdownClick) {
            onDropdownClick(e, open, setOpen);
        }
    }

    return (
        <div className={classNames(className, "dropdown-container")} >
            {React.cloneElement(trigger, {
                ref: triggerRef,
                onClick: handleToggleDropdown
            })}
            {open
                &&
                <div
                    ref={dropdownRef}
                    className="dropdown"
                    onClick={onDropdownClick ? handleDropdownClick : undefined}
                >
                    {children}
                </div>
            }
        </div>
    );
}


export default Dropdown;