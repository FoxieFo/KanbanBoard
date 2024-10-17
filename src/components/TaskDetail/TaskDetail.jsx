import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import s from './styles.module.scss';

export default function TaskDetail() {
    const { taskId } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState({ title: '', description: '' });
    const [description, setDescription] = useState('');

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || {};
        const task = storedTasks.Backlog[taskId] || storedTasks.Ready[taskId] || storedTasks.InProgress[taskId] || storedTasks.Finished[taskId];
        
        if (task) {
            setTask(task);
            setDescription(task.description || '');
        }
    }, [taskId]);

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    return (
        <div className={s.taskDetail}>
            <button className={s.taskDetail__closeButton} onClick={() => navigate('/')}>×</button>
            <textarea 
                className={s.taskDetail__textarea}
                value={description} 
                onChange={handleDescriptionChange} 
                placeholder="This task has no description"
            />
        </div>
    );
}