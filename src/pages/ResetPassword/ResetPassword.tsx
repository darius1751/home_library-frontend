import { Field } from '../../components/Field/Field';
import styles from './resetPassword.module.css';
import { useForm } from '../../hooks/useForm';
const initialForm = {
    user: ''
}
export const ResetPassword = () => {
    const { form, handleChange } = useForm(initialForm)
    const { user } = form;
    return (
        <div className="public_page">
            <form className={styles.resetPassword}>
                <h2>Reset Password</h2>
                <p>Please write your username or email and wait for a reset password</p>
                <Field
                    name='user'
                    label='User or Email'
                    handleChange={handleChange}
                    value={user}
                    required
                />
                <input className={`btn btn-primary ${styles.btnReset}`} value={`Reset password`}  type='submit'/>
            </form>
        </div>
    )
}