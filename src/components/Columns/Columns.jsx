import s from './styles.module.scss'
import Column from '../ui/Column/Column';

export default function Columns() {
    return (
        <main className={s.columns}>
            <Column title={'Backlog'}></Column>
            <Column title={'Ready'}></Column>
            <Column title={'In Progress'}></Column>
            <Column title={'Finished'}></Column>
        </main>
    );
}