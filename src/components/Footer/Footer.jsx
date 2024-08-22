import s from './styles.module.scss'

export default function Footer () {
    return (
        <footer className={s.footer__container}>
            <section className={s.footer__counter}>
                <p>Active tasks: N</p>
                <p>Finished tasks: N</p>
            </section>
            <p className={s.footer__author}>Kanban Board by NAME, YEAR</p>
        </footer>
    );
}