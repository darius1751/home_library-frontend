import { FormEvent, useContext, useState } from 'react';
import { Field } from '../../components/Field/Field';
import { useForm } from '../../hooks/useForm';
import { NavLink, useNavigate } from 'react-router-dom';
import { Credential } from '../../interfaces/credential';
import { login } from '../../services/login';
import { UserContext } from '../../context/contexts';
import { Footer } from '../../components/Footer/Footer';
import { navItems } from '../../Layouts/PublicLayout';
import styles from './login.module.css';
import { FieldImage } from '../../components/FieldImage/FieldImage';
const initialCredential: Credential = {
    user: '',
    password: ''
}
export const Login = () => {
    const { form, handleChange } = useForm(initialCredential);
    const { user, password } = form;
    const [image, setImage] = useState<File | undefined>(undefined);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { status, data } = await login(form);
        console.log({ data });
        if (status === 200) {
            setUser(data.user);
            localStorage.setItem('token', data.token);
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
                    <NavLink to={'/register'} className={`btn btn-primary btn-link`}>Register</NavLink>
                </div>
                <NavLink to={'/reset-password'} >Forgot Password</NavLink>
            </form>
            <FieldImage image={image} setImage={setImage} />
            <Footer navItems={navItems} className={styles.footer} />
        </div>
    )
}