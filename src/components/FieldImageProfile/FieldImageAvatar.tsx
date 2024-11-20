import { MouseEvent, useId, useState } from 'react';
import cancel from '../../assets/icons/ban-solid.svg';
import profile from '../../assets/icons/profile.svg';
import styles from './fieldImageAvatar.module.css';

type Props = {
    label?: string;
    initialImage?: string;
}
export const FieldImageAvatar = ({ initialImage, label }: Props) => {
    const id = useId();
    const [image, setImage] = useState();
    const handleCancel = (e: MouseEvent<HTMLImageElement>) => {
        
    }
    const handleUpload = () => {
        
    }
    return (
        <div className={`${styles.fieldProfileImage}`}>
            <label className={styles.label} htmlFor={id}>{label}</label>
            <div className={`${styles.options} ${!image ? styles.visibleOptions : styles.invisibleOptions}`}>
                <img src={profile} alt="upload" className={styles.icon} onClick={handleUpload} />
                {!!image && <img src={cancel} alt="cancel" className={styles.icon} onClick={handleCancel} />}
            </div>
        </div>
    )
}