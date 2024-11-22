import { ChangeEvent, useId, useRef, useState } from 'react';
import view from '../../assets/icons/eye-solid.svg';
import cancel from '../../assets/icons/ban-solid.svg';
import upload from '../../assets/icons/upload-solid.svg';
import styles from './fieldImage.module.css';
import { Modal } from '../Modal/Modal';
import { Preview } from './components/Preview/Preview';

type Props = {
    label?: string;
    initialImage?: string;
    image: File | undefined;
    setImage: React.Dispatch<File | undefined>;
    accept?: string;
}
export const FieldImage = ({ image, setImage, accept, label, initialImage = '' }: Props) => {
    const [imageURL, setImageURL] = useState(initialImage);
    const [modal, setModal] = useState(false);
    const id = useId();
    const $input = useRef<HTMLInputElement>(null);
    const handleUploadFile = ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
        const { files } = currentTarget;
        if (files?.length) {
            const file = files[0];
            const isValidFile = file.type.match(accept || '');
            if (!isValidFile)
                return;
            const url = URL.createObjectURL(file);
            setImageURL(url);
            setImage(file);
        }
    }
    const handleView = () => {
        // Separar componentes que usaran imagen, para reutilizar
        setModal(true);
    }

    const handleCancel = () => {
        setImage(undefined);
        setImageURL(initialImage || '');
        $input.current!.value = "";
    }
    const handleUpload = () => {
        $input.current?.click();
    }
    return (
        <>
            <div className={`${styles.fieldImage}`}>
                <label className={styles.label} htmlFor={id}>{label}</label>
                {!!(imageURL || initialImage) && < img className={styles.image} src={imageURL || initialImage} />}
                <div className={`${styles.options}`}>
                    {!!image && <img src={view} alt="view" className={styles.icon} onClick={handleView} />}
                    <img src={upload} alt="upload" className={styles.icon} onClick={handleUpload} />
                    {!!image && <img src={cancel} alt="cancel" className={styles.icon} onClick={handleCancel} />}
                    <input type="file" className={styles.input} ref={$input} onChange={handleUploadFile} id={id} />
                </div>
            </div>
            {
                modal && <Modal handleClose={() => setModal(false)} size='lg'>
                    <Preview image={image} initialImage={initialImage} />
                </Modal>
            }

        </>

    )
}