import { useState, useEffect } from 'react';
import useLocalStorage from "use-local-storage";
import Column from '../ui/Column/Column';
import s from './styles.module.scss';

export default function Columns() {
    const [tasks, setTasks] = useLocalStorage("tasks", {
        Backlog: [],
        Ready: [],
        InProgress: [],
        Finished: []
    });
    const [newTasks, setNewTasks] = useState([]);

    const handleNewTask = (task) => {
        setNewTasks((prevTasks) => [...prevTasks, task]);
        setTasks((prevTasks) => ({
            ...prevTasks,
            Backlog: [...prevTasks.Backlog, task]
        }));
    };

    const handleTaskSelect = (selectedTask, fromColumn, toColumn) => {
        const fromTasks = Array.isArray(tasks[fromColumn]) ? tasks[fromColumn] : [];
        const toTasks = Array.isArray(tasks[toColumn]) ? tasks[toColumn] : [];

        setTasks((prevTasks) => ({
            ...prevTasks,
            [toColumn]: [...toTasks, selectedTask],
            [fromColumn]: fromTasks.filter(task => task !== selectedTask) 
        }));

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
                newTasks={tasks.Backlog}
                onTaskSelect={(task) => handleTaskSelect(task, 'Backlog', 'Ready')}
            />
            <Column 
                title={'In Progress'} 
                tasks={tasks.InProgress} 
                setTasks={(newInProgressTasks) => setTasks({...tasks, InProgress: newInProgressTasks})} 
                newTasks={tasks.Ready}
                onTaskSelect={(task) => handleTaskSelect(task, 'Ready', 'InProgress')}
            />
            <Column 
                title={'Finished'} 
                tasks={tasks.Finished} 
                setTasks={(newFinishedTasks) => setTasks({...tasks, Finished: newFinishedTasks})} 
                newTasks={tasks.InProgress}
                onTaskSelect={(task) => handleTaskSelect(task, 'InProgress', 'Finished')}
            />
        </main>
    );
}
