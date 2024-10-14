import s from './styles.module.scss';
import { useState, useRef, useEffect } from 'react';
import CardButton from '../CardButton/CardButton';
import ColumnDropdown from '../ColumnDropdown/ColumnDropdown'; // Импортируем выпадающий список

export default function Column({ title, tasks = [], setTasks, isBacklog, onNewTask, newTasks, onTaskSelect }) {
    const [isAdding, setIsAdding] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const formRef = useRef(null);

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
        if (newTaskTitle.trim()) {
            onNewTask(newTaskTitle);
            setNewTaskTitle('');
            setIsAdding(false);
        } else {
            setIsAdding(true);
        }
    };

    const handleDeleteTask = (index) => {
        const updatedTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
        setTasks(updatedTasks);
        updateLocalStorage(title, updatedTasks);
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
                    <p className={s.column__task}>{task}</p>
                    <button 
                        className={s.column__deleteButton}
                        onClick={() => handleDeleteTask(index)}
                    >
                        ×
                    </button>
                </div>
            ))}
            {isBacklog && (
                <div ref={formRef}>
                    {isAdding ? (
                        <>
                            <input 
                                type="text" 
                                value={newTaskTitle} 
                                onChange={(e) => setNewTaskTitle(e.target.value)} 
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
                            onClick={() => setIsAdding(true)}
                        />
                    )}
                </div>
            )}
            {title === 'Ready' && newTasks.length > 0 && (
                <ColumnDropdown 
                    previousTasks={newTasks} 
                    onTaskSelect={onTaskSelect} 
                />
            )}
        </div>
    );
}
