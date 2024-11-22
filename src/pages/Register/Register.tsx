import { FormEvent, useState } from "react"
import { Field } from "../../components/Field/Field"
import { useForm } from '../../hooks/useForm';
import { NavLink, useNavigate } from 'react-router-dom';
import { CreateUserForm } from '../../interfaces';
import { register } from "../../services/register";
import { Footer } from "../../components/Footer/Footer";
import { navItems } from "../../Layouts/PublicLayout";
import { FieldImageAvatar } from "../../components/FieldImageAvatar/FieldImageAvatar";
import styles from './register.module.css';
const initialRegister: CreateUserForm = {
    name: '',
    email: '',
    user: '',
    birthday: '',
    password: '',
    confirmPassword: '',
}
export const defaultAvatar = 'https://res.cloudinary.com/dz6hey3wo/image/upload/v1732160676/avatars/default.svg'
export const Register = () => {
    const { form, handleChange, } = useForm(initialRegister);
    const [avatar, setAvatar] = useState<string>('');
    const { name, email, user, birthday, password, confirmPassword } = form;
    const navigate = useNavigate();
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {  password, user, ...userData } = form;
        const { status } = await register({ ...userData,  avatar: avatar || defaultAvatar, credential: { user, email, password } })
        if (status === 200) {
            alert(`El usuario se a creado correctamente`);
            navigate('/login');
        }
    }
    return (
        <>

            <div className={`page`}>
                <form onSubmit={handleSubmit} className={`form`}>
                    <FieldImageAvatar
                        label="Avatar"
                        initialImage={defaultAvatar}
                        avatar={avatar}
                        setAvatar={setAvatar}
                    />
                    <Field
                        name='name'
                        type='text'
                        label='Fullname'
                        placeholder='write your fullname'
                        handleChange={handleChange}
                        value={name}
                        className={styles.field}
                        required={true}
                    />
                    <Field
                        name='user'
                        type='text'
                        label='Username'
                        handleChange={handleChange}
                        value={user}
                        placeholder='write your username'
                        required={true}
                        className={styles.field}
                    />

                    <Field
                        name='email'
                        type='email'
                        label='Email'
                        placeholder='write your email'
                        handleChange={handleChange}
                        value={email}
                        required={true}
                        className={styles.field}
                    />
                    <Field
                        name='birthday'
                        type='date'
                        label='Birthday'
                        handleChange={handleChange}
                        value={birthday}
                        required={true}
                        className={styles.field}
                    />
                    <Field
                        name='password'
                        type='password'
                        label='Password'
                        handleChange={handleChange}
                        value={password}
                        placeholder='*********'
                        required={true}
                        className={styles.field}
                    />
                    <Field
                        name='confirmPassword'
                        type='password'
                        label='Confirm Password'
                        handleChange={handleChange}
                        value={confirmPassword}
                        placeholder='*********'
                        required={true}
                        className={styles.field}
                    />
                    <div className={`${styles.row} ${styles.btnOptions}`}>
                        <input value={'Register'} type='submit' className={`btn btn-primary ${styles.btnRegister}`} />
                        <NavLink to={'/login'}>I already have an account</NavLink>
                    </div>

                </form >
            </div >
            <Footer navItems={navItems} className={styles.footer} />
        </>
    )
}