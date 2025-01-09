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
import { Modal } from "../../components/Modal/Modal";
import { sendWelcomeEmail } from "../../services/email";
import { Carrousel } from "../../components/Carrousel/Carrousel";
import { Cite } from "../Home/components/Cite/Cite";
import { SEO } from "../../components/SEO/SEO";
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
    const [error, setError] = useState('');

    const validate = (userData: CreateUserForm, avatar: string) => {
        let currentError = ''
        if (userData.password !== userData.confirmPassword) {
            currentError += 'Passwords do not match. '
        }
        if (!avatar) {
            currentError += 'Avatar is required. '
        }
        if (!userData.name) {
            currentError += 'Name is required. '
        }
        if (!userData.email) {
            currentError += 'Email is required. '
        }
        if (!userData.user) {
            currentError += 'Username is required. '
        }
        if (!userData.birthday) {
            currentError += 'Birthday is required. '
        }
        setError(currentError)
        if (currentError) {
            throw currentError
        }

    }
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { confirmPassword, password, user, ...userData } = form;
            validate(form, avatar)
            const { status } = await register({ ...userData, avatar: avatar || defaultAvatar, credential: { user, password } })
            if (status === 200) {
                sendWelcomeEmail(form.email)
                setError("The user was created successfully");
                navigate('/login');

            }
        } catch (e: unknown) {
            if (e instanceof Error) {
                setError(e.message + ". Please complete all the fields.");
            } else {
                setError(e as string);
            }
            console.log({ e });
        };
    }

    return (
        <>
            <SEO
                title="Home Library - Register"
                description='Home Library create a new account'
                keywords='register, create account home library, new account home library'
            />
            <div className={`page public-page`}>
                {
                    error && <Modal handleClose={() => setError('')} size='sm'>
                        <p>{error}</p>
                    </Modal>
                }
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
                <Carrousel>
                    <Cite creator='C.S. Lewis' text='We read to know we are not alone.' />
                    <Cite creator='Cicero' text='A room without books is like a body without a soul.' />
                    <Cite creator='John Steinbeck' text='I guess there are never enough books.' />
                    <Cite creator='Jhumpa Lahiri' text='That’s the thing about books. They let you travel without moving your feet.' />
                    <Cite creator='Philip Pullman' text='We don’t need a list of rights and wrongs, tables of dos and don’ts: We need books, time, and silence. Thou shalt not is soon forgotten, but Once upon a time lasts forever.' />
                </Carrousel>
                <Footer navItems={navItems} className={styles.footer} />

            </div >

        </>
    )
}