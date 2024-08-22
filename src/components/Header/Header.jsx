import ThemeSwitcher from "../ui/ThemeSwitcher/ThemeSwitcher";
import s from './styles.module.scss';

export default function Header({ isDark, setIsDark }) {
    return (
        <header className={s.header__container}>
            <p className={s.header__text}>Awesome Kanban Board</p>
            <ThemeSwitcher
                isChecked={isDark}
                handleChange={() => setIsDark(!isDark)}
            />
            <div className={s.header__profile}></div>
        </header>
    );
}