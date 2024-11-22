import { Modal } from "../../Modal/Modal";
import Avatars from "./Avatars";

type Props = {
    setImage: React.Dispatch<string>;
    setModal: React.Dispatch<boolean>;
}
export const ModalAvatars =({ setImage, setModal }: Props) => {
    return (
        <Modal size='lg' handleClose={() => setModal(false)}>
            <Avatars setImage={setImage} setModal={setModal} />
        </Modal>
    )
}