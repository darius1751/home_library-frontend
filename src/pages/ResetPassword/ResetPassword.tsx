import { Field } from '../../components/Field/Field';
import styles from './resetPassword.module.css';
import { useForm } from '../../hooks/useForm';
import { sendPasswordEmail } from '../../services/email';
import { FormEvent } from 'react';
import { useNavigate} from 'react-router-dom';
const initialForm = {
    email: ''
}
export const ResetPassword = () => {
    const {form, handleChange} = useForm(initialForm);
    const { email } = form;
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            sendPasswordEmail(email);
            navigate('/email-sent');
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="page">
            <form className={`form`} onSubmit={handleSubmit}>
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