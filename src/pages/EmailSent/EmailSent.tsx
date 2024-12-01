import { useState } from "react";
import { Modal } from "../../components/Modal/Modal";
import { useNavigate } from "react-router-dom";



const EmailSent = () => {
    const [modal, setModal] = useState(true);
    const navigate = useNavigate()

    const handleClose = () => {
        setModal(false);
        navigate('/login');
        
    }
   
    return (
        <div>
            <h1>Check your mailbox for a password reset email.</h1>
            {
                modal && <Modal handleClose={handleClose} size='sm'>
                    <p>Please check your email for a reset password message</p>
                </Modal>
            }
        </div>
    )
}

export default EmailSent