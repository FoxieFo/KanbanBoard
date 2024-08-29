import s from './styles.module.scss';
import avatar from '../../../assets/images/avatar.svg';

import Dropdown from '../Dropdown/Dropdown';

export default function User() {

    return (
        <div className={s.user__container}>
            <img
                className={s.user__img}
                src={avatar}
                alt="userpic"
            />
            <div className={s.user__dropDown}>
                <Dropdown />
            </div>
        </div>
    );
}