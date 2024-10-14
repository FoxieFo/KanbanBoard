import s from './styles.module.scss';
import useLocalStorage from "use-local-storage";

export default function Footer() {
    const [tasks] = useLocalStorage("tasks", {
        Backlog: [],
        Ready: [],
        InProgress: [],
        Finished: []
    });

    const activeTasksCount = tasks.Backlog.length || 0;
    const finishedTasksCount = tasks.Finished.length || 0;

    return (
        <footer className={s.footer__container}>
            <section className={s.footer__counter}>
                <p>Active tasks: {activeTasksCount}</p>
                <p>Finished tasks: {finishedTasksCount}</p>
            </section>
            <p className={s.footer__author}>Kanban Board by Victoria A., 2024</p>
        </footer>
    );
}