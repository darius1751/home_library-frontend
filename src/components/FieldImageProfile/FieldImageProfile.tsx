import { ChangeEvent, MouseEvent, useId, useRef } from 'react';
import cancel from '../../assets/icons/ban-solid.svg';
import profile from '../../assets/icons/profile.svg';
import styles from './fieldImageProfile.module.css';

type Props = {
    label?: string;
    initialImage?: string;
    image: File | undefined;
    setImage: React.Dispatch<File | undefined>;
    accept?: string;
}
export const FieldImageProfile = ({ image, setImage, accept, label }: Props) => {
    // const [imageURL, _] = useState(initialImage);
    const id = useId();
    const $input = useRef<HTMLInputElement>(null);
    // if (initialImage)
    //     $input.current!.parentElement!.parentElement!.style.backgroundImage = initialImage;
    const handleUploadFile = ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
        const { files, parentElement } = currentTarget;
        if (files) {
            const file = files[0];
            const isValidFile = file.type.match(accept || '');
            if (!isValidFile)
                return;
            const url = URL.createObjectURL(file);
            const { parentElement: $fieldImageProfile } = parentElement!;
            $fieldImageProfile!.style.backgroundImage = `url('${url}')`;
            // setImageURL(url);
            setImage(file);
        }
    }
    const handleCancel = ({ currentTarget }: MouseEvent<HTMLImageElement>) => {
        const { parentElement } = currentTarget;
        const { parentElement: $fieldImageProfile } = parentElement!;
        $fieldImageProfile!.style.backgroundImage = "";
        setImage(undefined);
        // setImageURL(initialImage);
    }
    const handleUpload = () => {
        $input.current?.click();
    }
    return (
        <div className={`${styles.fieldProfileImage}`}>
            <label className={styles.label} htmlFor={id}>{label}</label>
            <div className={`${styles.options} ${!image ? styles.visibleOptions : styles.invisibleOptions}`}>
                <img src={profile} alt="upload" className={styles.icon} onClick={handleUpload} />
                {!!image && <img src={cancel} alt="cancel" className={styles.icon} onClick={handleCancel} />}
                <input type="file" className={styles.input} ref={$input} onChange={handleUploadFile} id={id} />
            </div>
        </div>
    )
}