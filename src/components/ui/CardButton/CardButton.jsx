import s from './styles.module.scss'

export default function CardButton({ buttonText, onClick }) {
    return (
        <div className={s.cardButton__container}>
            <button 
                className={s.cardButton__button}
                onClick={onClick}
            >
                {buttonText}
            </button>
        </div>
    );
}
