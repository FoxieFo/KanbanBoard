import s from './styles.module.scss';
import { useState, useEffect, useRef } from 'react';
import CardButton from '../CardButton/CardButton';

export default function Column({ title }) {
    const [tasks, setTasks] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const formRef = useRef(null);

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || {};
        setTasks(savedTasks[title] || []);
    }, [title]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (formRef.current && !formRef.current.contains(event.target)) {
                setIsAdding(false);
                setNewTaskTitle('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleAddTaskClick = () => {
        if (isAdding) {
            if (newTaskTitle.trim()) {
                const updatedTasks = [...tasks, newTaskTitle];
                setTasks(updatedTasks);
                setNewTaskTitle('');
                setIsAdding(false);
                updateLocalStorage(title, updatedTasks);
            }
        } else {
            setIsAdding(true);
        }
    };

    const handleInputChange = (event) => {
        setNewTaskTitle(event.target.value);
    };

    const handleDeleteTask = (index) => {
        const updatedTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
        setTasks(updatedTasks);
        updateLocalStorage(title, updatedTasks);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleAddTaskClick();
        }
    };

    const updateLocalStorage = (columnTitle, updatedTasks) => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || {};
        savedTasks[columnTitle] = updatedTasks;
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
    };

    return (
        <div className={s.column__container}>
            <span className={s.column__title}>{title}</span>
            {tasks.map((task, index) => (
                <div key={index} className={s.column__taskContainer}>
                    <p className={s.column__task}>
                        {task}
                    </p>
                    <button 
                        className={s.column__deleteButton}
                        onClick={() => handleDeleteTask(index)}
                    >
                        ×
                    </button>
                </div>
            ))}
            <div ref={formRef}>
                {isAdding ? (
                    <>
                        <input 
                            type="text" 
                            value={newTaskTitle} 
                            onChange={handleInputChange} 
                            onKeyDown={handleKeyDown}
                            placeholder="Enter task title"
                            className={s.column__input}
                        />
                        <CardButton 
                            buttonText="Submit" 
                            onClick={handleAddTaskClick}
                        />
                    </>
                ) : (
                    <CardButton 
                        buttonText="+ Add card" 
                        onClick={handleAddTaskClick}
                    />
                )}
            </div>
        </div>
    );
}