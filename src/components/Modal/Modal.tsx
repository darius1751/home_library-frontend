import { MouseEventHandler } from 'react';
import close from '../../assets/icons/cancel.svg';
import styles from './modal.module.css';
type ModalSize = "lg" | "md" | "sm";
type Props = {
    children: React.ReactNode;
    size: ModalSize;
    handleClose: MouseEventHandler<HTMLElement>;
    className?: string;
}
export const Modal = ({ children, size, handleClose, className = '' }: Props) => {
    return (
        <div className={`${styles.background}`}>
            <div className={`${styles.modal} ${styles[size]} ${className}`}>
                <img src={close} alt="close-modal" onClick={handleClose} className={styles.close} />
                {children}
            </div>
        </div>
    )
}