import { memo, useEffect, useState } from 'react';
import { getAllAvatars } from '../../../services/avatar';
import styles from '../fieldImageAvatar.module.css';
type Props = {
    setImage: any;
    setModal: any;
}
const Avatars = ({ setImage, setModal }: Props) => {
    const [avatars, setAvatars] = useState<string[]>([]);
    useEffect(() => {
        (
            async () => {
                const allAvatars = await getAllAvatars();
                setAvatars(allAvatars);
            }
        )();
    }, []);
    const handleCheck = (avatar: string) => {
        setImage(avatar);
        setModal(false);
    }
    return (
        <div className={styles.avatars}>
            <h1 className={styles.avatarsTitle}>Selecciona el avatar que mas te guste :D</h1>
            <div className={styles.avatarsList}>
                {
                    avatars.map(
                        (avatar, index) => (
                            <div className={styles.avatarIconContorn} onClick={() => handleCheck(avatar)}>
                                <img src={avatar} alt={`avatar-${index}`} className={styles.avatarIcon} />
                            </div>
                        )
                    )
                }
            </div>
        </div>
    )
}
export default memo(Avatars);