import { ChangeEvent, useId, useRef, useState } from 'react';
import view from '../../assets/icons/eye-solid.svg';
import cancel from '../../assets/icons/ban-solid.svg';
import upload from '../../assets/icons/upload-solid.svg';
import styles from './fieldImage.module.css';

type Props = {
    label?: string;
    initialImage?: string;
    image: File | undefined;
    setImage: React.Dispatch<File | undefined>;
    accept?: string;
}
export const FieldImage = ({ image, setImage, accept, label, initialImage = '' }: Props) => {
    const id = useId();
    const $input = useRef<HTMLInputElement>(null);
    const [imageURL, setImageURL] = useState(initialImage);
    const handleUploadFile = ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
        const { files } = currentTarget;
        if (files) {
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
    }

    const handleCancel = () => {
        setImage(undefined);
        setImageURL(initialImage);
    }
    const handleUpload = () => {
        $input.current?.click();
    }
    return (
        <div className={`${styles.fieldImage}`}>
            <label className={styles.label} htmlFor={id}>{label}</label>
            {!!imageURL && < img className={styles.image} src={imageURL} />}
            <div className={`${styles.options} ${!image ? styles.visibleOptions : styles.invisibleOptions}`}>
                {!!image && <img src={view} alt="view" className={styles.icon} onClick={handleView} />}
                <img src={upload} alt="upload" className={styles.icon} onClick={handleUpload} />
                {!!image && <img src={cancel} alt="cancel" className={styles.icon} onClick={handleCancel} />}
                <input type="file" className={styles.input} ref={$input} onChange={handleUploadFile} id={id} />
            </div>
        </div>
    )
}