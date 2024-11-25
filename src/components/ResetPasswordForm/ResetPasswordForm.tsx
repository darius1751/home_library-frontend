import {  useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Field } from "../../components/Field/Field";
import {updateOne, getOneById} from '../../services/login'
import { findById } from "../../services/register";
import { useEffect, useState } from "react";
import type {  FormEvent } from 'react';
import type { Credential, User } from "../../interfaces";
import { Modal } from "../Modal/Modal";


const ResetPasswordForm = () => {
    const { id} = useParams()
    const [confirmPassword, setConfirmPassword] = useState('');
    const [user, setUser] = useState<Partial<User>>({});
    const [credential, setCredential] = useState<Partial<Credential>>({});
    const [newPassword, setNewPassword] = useState('')
    const [token] = useSearchParams();
    const navigate = useNavigate();
    const [error, setError] = useState('');


    useEffect(() => {
        const getCredential = async () => {
            console.log("token", token.toString())
            try {
                const idValue = id || '';
                if(idValue !== '') {
                    const currentUser = await findById(idValue)
                    await setUser(currentUser.data);
                    const response = await getOneById(currentUser.data.credential_id || '')
                    await setCredential(response);
                    console.log(credential)
                
                }
                
            } catch (error) {
                console.log(error);
            }
        }
        getCredential();
    },[]);
       
    
    useEffect(() => {
        console.log("searching credential", credential);
      }, [credential]);

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        credential.password = newPassword
        try {
            if (credential?.password !== confirmPassword) {
                setError('Passwords do not match.');
                return;
            }
            await updateOne(user.credential_id || '', credential as Credential, token.toString());
           navigate('/login');

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="page">
             {
                error  && <Modal handleClose={() => setError('')} size='sm'>
                    <p>{error}</p>
                </Modal>
            }
            <form className={`form`} onSubmit={handleSubmit}>
                <Field
                    name='password'
                    type='password'
                    label='New Password'
                    value={newPassword}
                    handleChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <Field
                    name='confirmPassword'
                    type='password'
                    label='Confirm New Password'
                    handleChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    required
                />
                <input className={`btn btn-primary`} value={`Reset password`}  type='submit'/>
            </form>

        </div>
    )
}

export default ResetPasswordForm