import ThemeSwitcher from "../ui/ThemeSwitcher/ThemeSwitcher";

import useLocalStorage from "use-local-storage";

import s from './styles.module.scss'

export default function Header() {
    const [isDark, setIsDark] = useLocalStorage("isDark", false)

    return (
        <header className={s.header__container} data-theme={isDark ? "dark" : "light"}>
            <p className={s.header__text}>Awesome Kanban Board</p>
            <ThemeSwitcher
                isChecked={isDark}
                handleChange={() => setIsDark(!isDark)}
            />
        </header>
    );
}