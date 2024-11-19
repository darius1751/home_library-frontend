import { Field } from '../../components/Field/Field';
import styles from './resetPassword.module.css';
import { useForm } from '../../hooks/useForm';
import { sendPasswordEmail } from '../../services/email';
import { FormEvent } from 'react';
const initialForm = {
    email: ''
}
export const ResetPassword = () => {
    const {form, handleChange} = useForm(initialForm);
    const { email } = form;

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            sendPasswordEmail(email);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="public_page" >
            <form className={styles.resetPassword} onSubmit={handleSubmit}>
                <h2>Reset Password</h2>
                <p>Please write your email and wait for a reset password message in your inbox</p>
                <Field
                    name='email'
                    type='email'
                    label='Email'
                    handleChange={handleChange}
                    value={email}
                    required
                />
                <input className={`btn btn-primary ${styles.btnReset}`} value={`Reset password`}  type='submit'/>
            </form>
        </div>
    )
}