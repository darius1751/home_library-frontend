import { NavLink } from 'react-router-dom';
import styles from './logo.module.css';
type Props = {
    to?: string;
    className?: string;
}
export const Logo = ({ to, className }: Props) => {
    return (
        <NavLink to={to ?? '/'} className={`${styles.logo} ${className}`} />
    )
}