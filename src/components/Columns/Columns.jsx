import { useState, useEffect } from 'react';
import Column from '../ui/Column/Column';
import s from './styles.module.scss';
import ColumnDropdown from '../ui/ColumnDropdown/ColumnDropdown'; // Import the dropdown component

export default function Columns() {
    const [tasks, setTasks] = useState({
        Backlog: [],
        Ready: [],
        InProgress: [],
        Finished: []
    });
    const [newTasks, setNewTasks] = useState([]); // Store new tasks temporarily

    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, []);

    const handleNewTask = (task) => {
        setNewTasks((prevTasks) => [...prevTasks, task]); // Add task to newTasks array
        setTasks((prevTasks) => ({
            ...prevTasks,
            Backlog: [...prevTasks.Backlog, task] // Keep it in Backlog
        }));
    };

    const handleTaskSelect = (selectedTask) => {
        setTasks((prevTasks) => ({
            ...prevTasks,
            Ready: [...prevTasks.Ready, selectedTask], // Move selected task to Ready
            Backlog: prevTasks.Backlog.filter(task => task !== selectedTask) // Remove from Backlog
        }));
        setNewTasks((prevTasks) => prevTasks.filter(task => task !== selectedTask)); // Remove from newTasks
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
            />

            {newTasks.length > 0 && (
                <ColumnDropdown 
                    previousTasks={newTasks} // Pass the array of new tasks
                    onTaskSelect={handleTaskSelect}
                />
            )}

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
