import { FormEvent } from 'react';
import { Field } from '../../components/Field/Field';
import { useForm } from '../../hooks/useForm';
import { NavLink } from 'react-router-dom';
import { Credential } from '../../interfaces/credential';
import styles from './login.module.css';
const initialCredential: Credential = {
    user: '',
    password: ''
}
export const Login = () => {
    const { form, handleChange } = useForm(initialCredential);
    const { user, password } = form;
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }
    return (
        <div className={`public_page`}>
            <form onSubmit={handleSubmit} className={styles.login}>
                <Field
                    name='user'
                    type='text'
                    label='Email'
                    placeholder='john@john.com'
                    handleChange={handleChange}
                    value={user}
                />
                <Field
                    name='password'
                    type='password'
                    label='Password'
                    handleChange={handleChange}
                    value={password}
                    placeholder='*********'
                />
                <div className={`btnOptions`}>
                    <input value={'Sign In'} type='submit' className={`btn btn-primary`} />
                    <NavLink to={'/register'} className={`btn btn-primary`}>Register</NavLink>
                </div>
                <NavLink to={'/resend-password'} >Forgot Password</NavLink>
            </form>
        </div>
    )
}