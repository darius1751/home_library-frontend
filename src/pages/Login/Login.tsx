import { FormEvent, useContext, useState } from 'react';
import { Field } from '../../components/Field/Field';
import { useForm } from '../../hooks/useForm';
import { NavLink, useNavigate } from 'react-router-dom';
import { Credential } from '../../interfaces/credential';
import { getOneById, login } from '../../services/login';
import { UserContext } from '../../context/contexts';
import { Footer } from '../../components/Footer/Footer';
import { navItems } from '../../Layouts/PublicLayout';
import styles from './login.module.css';
import { findUserByEmail } from '../../services/register';
// import { FieldMultiOption } from '../../components/FieldMultiOption/FieldMultiOption';
const initialCredential: Credential = {
    user: '',
    password: '',
}
export const Login = () => {
    const { form, handleChange } = useForm(initialCredential);
    const {  password } = form;
    // const [selections, setSelections] = useState<string[]>([]);
    const {setUser } = useContext(UserContext);
    const [input, setInput] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(input.includes('@')){
            const currentUser = await findUserByEmail(input);
            const credential = await getOneById(currentUser.data.credential_id || '');
            form.user = credential.user;
        } else {
            form.user = input;
        }
        console.log(input)
        const { status, data } = await login(form);
        console.log({ data });
        if (status === 200) {
            setUser(data.user);
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.user.username || '');
            navigate('/dashboard');
        }
    }
    return (
        <div className={`page`}>
            <form onSubmit={handleSubmit} className={`form ${styles.login}`}>
                <Field
                    name='user or email'
                    type='text'
                    label='User or Email'
                    placeholder='user or email@domain.com'
                    handleChange={(e) => {
                        setInput(e.target.value);
                    }}
                    value={input}
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
            <Footer navItems={navItems} className={styles.footer} />
        </div>
    )
}