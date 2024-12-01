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
import { Modal } from '../../components/Modal/Modal';
import { Carrousel } from '../../components/Carrousel/Carrousel';
import { Cite } from '../Home/components/Cite/Cite';
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
    const [error, setError] = useState('');

    const validate = () => {
        let currentError = '';
        if (!form.user) {
            currentError += 'The user is required. ';
        }
        if (!form.password) {
            currentError += 'The password is required. ';
        }
        setError(currentError);
        if(currentError) {
            throw currentError
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            if(input.includes('@')){
                const currentUser = await findUserByEmail(input);
                const credential = await getOneById(currentUser.data.credential_id || '');
                form.user = credential.user;
            } else {
                form.user = input;
            }
            validate()
            const { status, data } = await login(form);
            if (status === 200) {
                setUser(data.user);
                localStorage.setItem('token', data.token);
                navigate('/dashboard');
            }
        }catch (e: unknown) {
            if (e instanceof Error) {
                setError(e.message + ". Please complete all the fields.");
            }
            else {
                setError(e as string);
            }
            console.log({ e });
        };
    }
    return (
        <div className={`page`}>
             {
                error  && <Modal handleClose={() => setError('')} size='sm'>
                    <p>{error}</p>
                </Modal>
            }
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
                    required={true}
                />
                <Field
                    name='password'
                    type='password'
                    label='Password'
                    handleChange={handleChange}
                    value={password}
                    placeholder='*********'
                    required={true}
                />
                <div className={`btnOptions`}>
                    <input value={'Sign In'} type='submit' className={`btn btn-primary`} />
                    <NavLink to={'/register'} className={`btn btn-primary btn-link`}>Register</NavLink>
                </div>
                <NavLink to={'/reset-password'} >Forgot Password</NavLink>
            </form>
            <Carrousel>
                        <Cite creator='C.S. Lewis' text='We read to know we are not alone.' />
                        <Cite creator='Cicero' text='A room without books is like a body without a soul.' />
                        <Cite creator='John Steinbeck' text='I guess there are never enough books.' />
                        <Cite creator='Jhumpa Lahiri' text='That’s the thing about books. They let you travel without moving your feet.' />
                        <Cite creator='Philip Pullman' text='We don’t need a list of rights and wrongs, tables of dos and don’ts: We need books, time, and silence. Thou shalt not is soon forgotten, but Once upon a time lasts forever.' />
                    </Carrousel>
            <Footer navItems={navItems} className={styles.footer} />
        </div>
    )
}