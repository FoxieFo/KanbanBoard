import { useState, useEffect } from 'react';
import Column from '../ui/Column/Column';
import s from './styles.module.scss';
import ColumnDropdown from '../ui/ColumnDropdown/ColumnDropdown';

export default function Columns() {
    const [tasks, setTasks] = useState({
        Backlog: [],
        Ready: [],
        InProgress: [],
        Finished: []
    });
    const [newTasks, setNewTasks] = useState([]);

    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, []);

    const handleNewTask = (task) => {
        setNewTasks((prevTasks) => [...prevTasks, task]);
        setTasks((prevTasks) => ({
            ...prevTasks,
            Backlog: [...prevTasks.Backlog, task]
        }));
    };

    const handleTaskSelect = (selectedTask, fromColumn, toColumn) => {
        // Проверяем, что обе колонки - это массивы
        const fromTasks = Array.isArray(tasks[fromColumn]) ? tasks[fromColumn] : [];
        const toTasks = Array.isArray(tasks[toColumn]) ? tasks[toColumn] : [];

        setTasks((prevTasks) => ({
            ...prevTasks,
            [toColumn]: [...toTasks, selectedTask], // Добавляем выбранную задачу в целевую колонку
            [fromColumn]: fromTasks.filter(task => task !== selectedTask) // Убираем задачу из исходной колонки
        }));

        // Убираем задачу из массива newTasks, если она перемещена из Backlog
        if (fromColumn === 'Backlog') {
            setNewTasks((prevTasks) => prevTasks.filter(task => task !== selectedTask));
        }
    };

    return (
        <main className={s.columns}>
            <Column 
                title={'Backlog'} 
                tasks={tasks.Backlog} 
                isBacklog={true} 
                setTasks={(newBacklogTasks) => setTasks({...tasks, Backlog: newBacklogTasks})} 
                onNewTask={handleNewTask} 
            />
            <Column 
                title={'Ready'} 
                tasks={tasks.Ready} 
                setTasks={(newReadyTasks) => setTasks({...tasks, Ready: newReadyTasks})} 
                newTasks={tasks.Backlog} // Задачи для перемещения из Backlog
                onTaskSelect={(task) => handleTaskSelect(task, 'Backlog', 'Ready')} // Перемещение из Backlog в Ready
            />
            <Column 
                title={'In Progress'} 
                tasks={tasks.InProgress} 
                setTasks={(newInProgressTasks) => setTasks({...tasks, InProgress: newInProgressTasks})} 
                newTasks={tasks.Ready} // Задачи для перемещения из Ready
                onTaskSelect={(task) => handleTaskSelect(task, 'Ready', 'InProgress')} // Перемещение из Ready в In Progress
            />
            <Column 
                title={'Finished'} 
                tasks={tasks.Finished} 
                setTasks={(newFinishedTasks) => setTasks({...tasks, Finished: newFinishedTasks})} 
                newTasks={tasks.InProgress} // Задачи для перемещения из In Progress
                onTaskSelect={(task) => handleTaskSelect(task, 'InProgress', 'Finished')} // Перемещение из In Progress в Finished
            />
        </main>
    );
}
