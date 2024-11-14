import { ChangeEvent, MouseEvent, useRef, useState } from 'react';
import view from '../../assets/icons/eye-solid.svg';
import cancel from '../../assets/icons/ban-solid.svg';
import upload from '../../assets/icons/upload-solid.svg';
import styles from './fieldImage.module.css';
type Props = {
    label?: string;
    image: File | undefined;
    setImage: React.Dispatch<File | undefined>;
    accept?: string;
}
export const FieldImage = ({ image, setImage, accept }: Props) => {
    // const id = useId();
    const $input = useRef<HTMLInputElement>(null);
    const [imageURL, setImageURL] = useState('');
    const handleUploadFile = ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
        const { files, parentElement: $options } = currentTarget;
        if (files) {
            const file = files[0];
            const isValidFile = file.type.match(accept || '');
            if (!isValidFile)
                return;
            const url = URL.createObjectURL(file);
            setImageURL(url);
            // const { parentElement: $fieldImage } = $options!;
            // $fieldImage!.style.backgroundImage = `url('${url}')`;
            setImage(file); HTMLInputElement
        }
    }
    const handleView = () => {

    }

    const handleCancel = ({ currentTarget }: MouseEvent) => {
        const { parentElement } = currentTarget;
        parentElement!.parentElement!.style.backgroundImage = "";
        setImage(undefined);
    }
    const handleUpload = () => {
        $input.current?.click();
    }
    return (
        <div className={`${styles.fieldImage}`}>
            {/* <label htmlFor={id}>{label}</label> */}
            {!!image && < img className={styles.image} src={imageURL} />}
            <div className={`${styles.options} ${!image ? styles.visibleOptions : styles.invisibleOptions}`}>
                {!!image && <img src={view} alt="view" className={styles.icon} onClick={handleView} />}
                {/* <NavLink
                    to={imageURL}
                    target='_blank'>
                    <img src={view} alt="view" className={styles.icon} onClick={handleView} />
                </NavLink> */}
                <img src={upload} alt="upload" className={styles.icon} onClick={handleUpload} />
                {!!image && <img src={cancel} alt="cancel" className={styles.icon} onClick={handleCancel} />}
                <input type="file" className={styles.input} ref={$input} onChange={handleUploadFile} />
            </div>
        </div>
    )
}