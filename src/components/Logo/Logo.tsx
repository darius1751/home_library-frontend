import { NavLink } from 'react-router-dom';
import styles from './logo.module.css';
type Props = {
    to?: string;
}
export const Logo = ({ to }: Props) => {
    return (
        <NavLink to={to ?? '/'} className={styles.logo} />
    )
}