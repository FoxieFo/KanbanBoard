import { useState, useRef, useEffect } from 'react';
import s from './styles.module.scss';

export default function ColumnDropdown({ previousTasks = [], onTaskSelect }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

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
                <span>Choose the task</span>
                <div className={s.arrow}></div>
            </div>
            <div className={`${s.dropdown__menu} ${isOpen ? s.dropdown__menu_active : ''}`}>
                {previousTasks.length > 0 ? (
                    previousTasks.map((task, index) => (
                        <div 
                            key={index} 
                            className={s.dropdown__item} 
                            onClick={() => onTaskSelect(task)}
                        >
                            {task}
                        </div>
                    ))
                ) : (
                    <div className={s.dropdown__item}>No tasks available</div>
                )}
            </div>
        </div>
    );
}