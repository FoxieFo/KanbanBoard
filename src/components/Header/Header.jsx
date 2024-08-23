import ThemeSwitcher from "../ui/ThemeSwitcher/ThemeSwitcher";
import User from "../ui/User/User";

import s from './styles.module.scss';

export default function Header({ isDark, setIsDark }) {
    return (
        <header className={s.header__container}>
            <p className={s.header__text}>Awesome Kanban Board</p>
            <div className={s.header__profile}>
            <ThemeSwitcher
                isChecked={isDark}
                handleChange={() => setIsDark(!isDark)}
            />
            <User />
            </div>
        </header>
    );
}