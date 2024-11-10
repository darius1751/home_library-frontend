import { FormEvent, useContext } from 'react';
import { Field } from '../../components/Field/Field';
import { useForm } from '../../hooks/useForm';
import { NavLink, useNavigate } from 'react-router-dom';
import { Credential } from '../../interfaces/credential';
import styles from './login.module.css';
import { login } from '../../services/login';
import { UserContext } from '../../context/contexts';
const initialCredential: Credential = {
    user: '',
    password: ''
}
export const Login = () => {
    const { form, handleChange } = useForm(initialCredential);
    const { user, password } = form;
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { status, data } = await login(form);
        if (status === 200) {
            setUser(data);
            navigate('/dashboard');
        }
    }
    return (
        <div className={`public_page`}>
            <form onSubmit={handleSubmit} className={styles.login}>
                <Field
                    name='user'
                    type='text'
                    label='User'
                    placeholder='user or email@domain.com'
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