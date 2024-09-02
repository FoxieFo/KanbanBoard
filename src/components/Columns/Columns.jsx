import s from './styles.module.scss';
import { useEffect, useState } from 'react';
import Column from '../ui/Column/Column';

export default function Columns() {
    const [tasks, setTasks] = useState({
        Backlog: [],
        Ready: [],
        InProgress: [],
        Finished: []
    });

    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, []);

    return (
        <main className={s.columns}>
            <Column title={'Backlog'} tasks={tasks.Backlog} setTasks={(newTasks) => setTasks({...tasks, Backlog: newTasks})} />
            <Column title={'Ready'} tasks={tasks.Ready} setTasks={(newTasks) => setTasks({...tasks, Ready: newTasks})} />
            <Column title={'In Progress'} tasks={tasks.InProgress} setTasks={(newTasks) => setTasks({...tasks, InProgress: newTasks})} />
            <Column title={'Finished'} tasks={tasks.Finished} setTasks={(newTasks) => setTasks({...tasks, Finished: newTasks})} />
        </main>
    );
}