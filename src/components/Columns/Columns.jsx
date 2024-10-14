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

    const handleTaskSelect = (selectedTask) => {
        setTasks((prevTasks) => ({
            ...prevTasks,
            Ready: [...prevTasks.Ready, selectedTask],
            Backlog: prevTasks.Backlog.filter(task => task !== selectedTask)
        }));
        setNewTasks((prevTasks) => prevTasks.filter(task => task !== selectedTask));
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
                newTasks={newTasks} // Передаем newTasks
                onTaskSelect={handleTaskSelect} // Передаем обработчик
            />
            <Column 
                title={'In Progress'} 
                tasks={tasks.InProgress} 
                setTasks={(newInProgressTasks) => setTasks({...tasks, InProgress: newInProgressTasks})} 
            />
            <Column 
                title={'Finished'} 
                tasks={tasks.Finished} 
                setTasks={(newFinishedTasks) => setTasks({...tasks, Finished: newFinishedTasks})} 
            />
        </main>
    );
}

