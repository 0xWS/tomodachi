import React, { ReactElement, useEffect, useRef, useState } from "react";
import './Dropdown.css';

interface DropdownProps {
    trigger: ReactElement;
    menu: ReactElement[];
}

const Dropdown: React.FC<DropdownProps> = ({trigger, menu}) => {

    const [open, setOpen] = useState<boolean>(false);
    const menuRef = useRef<HTMLUListElement>(null);

    const handleClick = () => {
        setOpen(!open);
    };

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
    }, []);

    
    return (
        <div className="dropdown">
            {React.cloneElement(trigger, {
                onClick: handleClick,
            })}
            {open ? (
                <ul className="menu" ref={menuRef}>
                    {menu.map((menuItem, index) => (
                        <li key={index} className="menu-item">
                            {React.cloneElement(menuItem, {
                                onClick: () => {
                                    menuItem.props.onClick?.();
                                    setOpen(false);
                                },
                            })}
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    )
}

export default Dropdown;