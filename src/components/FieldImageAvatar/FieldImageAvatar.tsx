import { MouseEvent, useId, useState } from 'react';
import { Modal } from '../Modal/Modal';
import Avatars from './components/Avatars';
import styles from './fieldImageAvatar.module.css';

type Props = {
    label?: string;
    initialImage?: string;
}
export const FieldImageAvatar = ({ initialImage, label }: Props) => {
    const id = useId();
    const [image, setImage] = useState();
    const [modal, setModal] = useState(false);
    const handleCancel = (e: MouseEvent<HTMLImageElement>) => {

    }
    const handleUpload = () => {
        setModal(true)
    }
    return (
        <>
            <div className={`${styles.fieldProfileImage}`}>
                <label className={styles.label} htmlFor={id}>{label}</label>
                <img src={image || initialImage} alt="upload" className={styles.avatar} onClick={handleUpload} />
            </div>
            {
                modal && (
                    <Modal size='lg' handleClose={() => setModal(false)}>
                        <Avatars setImage={setImage} setModal={setModal} />
                    </Modal>
                )
            }
        </>
    )
}