import { FormEvent, useContext } from "react"
import { Field } from "../../components/Field/Field"
import { useForm } from '../../hooks/useForm';
import { NavLink, useNavigate } from 'react-router-dom';
import { CreateUserForm } from '../../interfaces';
import styles from './register.module.css';
import { register } from "../../services/register";
import { UserContext } from "../../context/contexts";
const initialRegister: CreateUserForm = {
    name: '',
    email: '',
    user: '',
    birthday: '',
    password: '',
    confirmPassword: '',
}
export const Register = () => {
    const { form, handleChange, } = useForm(initialRegister);
    const { name, email, user, birthday, password, confirmPassword } = form;
    const navigate = useNavigate();
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { confirmPassword, password, user, ...userData } = form;
        const { status } = await register({ ...userData, credential: { user, password } })
        if (status === 200) {
            alert(`El usuario se a creado correctamente`);
            navigate('/login');
        }
    }
    return (
        <div className={`public_page`}>
            <form onSubmit={handleSubmit} className={styles.register}>
                <div className={styles.fields}>
                    <div className={styles.column}>
                        <Field
                            name='name'
                            type='text'
                            label='Fullname'
                            placeholder='write your fullname'
                            handleChange={handleChange}
                            value={name}
                            className={styles.field}
                        />
                        <Field
                            name='user'
                            type='text'
                            label='Username'
                            handleChange={handleChange}
                            value={user}
                            placeholder='write your username'
                            className={styles.field}
                        />
                        <Field
                            name='password'
                            type='password'
                            label='Password'
                            handleChange={handleChange}
                            value={password}
                            placeholder='*********'
                            className={styles.field}
                        />
                    </div>
                    <div className={styles.column}>
                        <Field
                            name='email'
                            type='text'
                            label='Email'
                            placeholder='write your email'
                            handleChange={handleChange}
                            value={email}
                            className={styles.field}
                        />
                        <Field
                            name='birthday'
                            type='date'
                            label='Birthday'
                            handleChange={handleChange}
                            value={birthday}
                            className={styles.field}
                        />
                        <Field
                            name='confirmPassword'
                            type='password'
                            label='Confirm Password'
                            handleChange={handleChange}
                            value={confirmPassword}
                            placeholder='*********'
                            className={styles.field}
                        />
                    </div>
                </div>
                <div className={`${styles.row} ${styles.btnOptions}`}>
                    <input value={'Register'} type='submit' className={`btn btn-primary ${styles.btnRegister}`} />
                    <NavLink to={'/login'}>I already have an account</NavLink>
                </div>

            </form>
        </div>
    )
}