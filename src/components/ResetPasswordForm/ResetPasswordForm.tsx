import {  useParams } from "react-router-dom";
import { Field } from "../../components/Field/Field";
import {updateOne, getOneById} from '../../services/login'
import { findById } from "../../services/register";
import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from 'react';
import type { Credential, User } from "../../interfaces";


const ResetPasswordForm = () => {
    const { id} = useParams()
    const [confirmPassword, setConfirmPassword] = useState('');
    const [user, setUser] = useState<Partial<User>>({});
    const [credential, setCredential] = useState<Partial<Credential>>({});

    useEffect(() => {
        const getCredential = async () => {
            try {
                const idValue = id || '';
                if(idValue !== '') {
                    const currentUser = await findById(idValue)
                    console.log("currentUser", currentUser.data)
                    await setUser(currentUser.data);
                    const response = await getOneById(currentUser.data.credential_id || '');
                    console.log(response)
                    setCredential(response);
                
                }
                
            } catch (error) {
                console.log(error);
            }
        }
        getCredential();
    }, [])
        
            

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (credential?.password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            updateOne(user.credential_id || '', credential as Credential);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h1>Reset Your Password</h1>
            <form onSubmit={handleSubmit}>
                <Field
                    name='password'
                    type='password'
                    label='Password'
                    handleChange={handleChange}
                    value={credential?.password }
                    required
                />
                <Field
                    name='confirmPassword'
                    type='password'
                    label='Confirm Password'
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