import s from './styles.module.scss'

export default function ThemeSwitcher({ handleChange, isChecked }) {
    return (
        <div className={s.switcherContainer}>
            <label className={s.switcher}>
                <input
                    type="checkbox"
                    id="check"
                    className={s.switcher__input}
                    onChange={handleChange}
                    checked={isChecked}
                />
                <span className={s.switcher__slider}></span>
            </label>
        </div>
    );
}