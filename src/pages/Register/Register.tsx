import { FormEvent } from "react"
import { Field } from "../../components/Field/Field"
import { useForm } from '../../hooks/useForm';
import { NavLink } from 'react-router-dom';
import { CreateUser } from '../../interfaces/create-user';
import styles from './register.module.css';
const initialRegister: CreateUser = {
    fullname: '',
    email: '',
    username: '',
    birthday: '',
    password: '',
    confirmPassword: '',
}
export const Register = () => {
    const { form, handleChange, } = useForm(initialRegister);
    const { fullname, email, username, birthday, password, confirmPassword } = form;
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }
    return (
        <div className={`public_page`}>
            <form onSubmit={handleSubmit} className={styles.register}>
                <div className={styles.fields}>
                    <div className={styles.column}>
                        <Field
                            name='fullname'
                            type='text'
                            label='Fullname'
                            placeholder='write your fullname'
                            handleChange={handleChange}
                            value={fullname}
                            className={styles.field}
                        />
                        <Field
                            name='username'
                            type='text'
                            label='Username'
                            handleChange={handleChange}
                            value={username}
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