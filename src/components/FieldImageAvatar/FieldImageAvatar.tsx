import { useId, useState } from 'react';
import styles from './fieldImageAvatar.module.css';
import { ModalAvatars } from './components/ModalAvatars';

type Props = {
    label?: string;
    initialImage?: string;
    avatar: string;
    setAvatar: React.Dispatch<string>
}
export const FieldImageAvatar = ({ initialImage, label, avatar, setAvatar }: Props) => {
    const id = useId();
    const [modal, setModal] = useState(false);

    const handleUpload = () => {
        setModal(true);
    }
    return (
        <>
            <div className={`${styles.fieldProfileImage}`}>
                <label className={styles.label} htmlFor={id}>{label}</label>
                <img src={avatar || initialImage} alt="upload" className={styles.avatar} onClick={handleUpload} />
            </div>
            {
                modal && (
                    <ModalAvatars setImage={setAvatar} setModal={setModal} />
                )
            }
        </>
    )
}