import { Field } from '../../components/Field/Field';
import styles from './resetPassword.module.css';
import { useForm } from '../../hooks/useForm';
import { sendPasswordEmail } from '../../services/email';
import { FormEvent, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { Modal } from '../../components/Modal/Modal';
const initialForm = {
    email: ''
}
export const ResetPassword = () => {
    const {form, handleChange} = useForm(initialForm);
    const { email } = form;
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!email) {
            setError('Email is required');
            throw new Error('Email is required');
        }
        try {
            sendPasswordEmail(email);
            navigate('/email-sent');
        } catch (e: unknown) {
            if (e instanceof Error) {
                setError(e.message + ". Please complete all the fields.");
            } else {
                setError(e as string);
            }
            console.log({ e });
        };
    }
    return (
        <div className="page">
             {
                error  && <Modal handleClose={() => setError('')} size='sm'>
                    <p>{error}</p>
                </Modal>
            }
            <form className={`form`} onSubmit={handleSubmit}>
                <h2>Reset Password</h2>
                <p>Please write your email and wait for a reset password message in your inbox</p>
                <Field
                    name='email'
                    type='email'
                    label='Email'
                    handleChange={handleChange}
                    value={email}
                    required={true}
                />
                <input className={`btn btn-primary ${styles.btnReset}`} value={`Reset password`}  type='submit'/>
            </form>
        </div>
    )
}