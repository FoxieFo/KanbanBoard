import s from './styles.module.scss'

export default function Column ({ title }) {
    return (
        <div className={s.column__container}>
            <span className={s.column__title}>{title}</span>
            <p className={s.column__task}>This task should be completed soon</p>
            <p className={s.column__task}>This task should be completed soon</p>
            <button className={s.column__button}>+ Add card</button>
        </div>
    );
}