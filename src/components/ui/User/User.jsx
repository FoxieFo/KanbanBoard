import s from './styles.module.scss';
import avatar from '../../../assets/images/avatar.svg';

export default function User() {
    return (
        <div className={s.user__container}>
            <img
                className={s.user__img}
                src={avatar}
                alt="userpic"
            />
            {/* <div className={s.user__dropDown}>
                <span className={s.user__dropDown__arrow}></span>
                <ul>
                    <li>Profile</li>
                    <li>Log Out</li>
                </ul>
            </div> */}
        </div>
    );
}