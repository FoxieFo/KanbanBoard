import { useState, useRef, useEffect } from 'react';
import s from './styles.module.scss';

export default function Dropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const options = ['Profile', 'Log Out'];

    const toggleDropdown = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={`${s.dropdown} ${isOpen ? s.active : ''}`} ref={dropdownRef}>
            <div className={s.dropdown__toggle} onClick={toggleDropdown}>
                <div className={s.arrow}></div>
            </div>
            <div className={`${s.dropdown__menu} ${isOpen ? s.dropdown__menu_active : ''}`}>
                {options.map((option, index) => (
                        <div key={index} className={s.dropdown__item}>
                            {option}
                        </div>
                    ))}
            </div>
        </div>
    );
}