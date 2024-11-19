import {  useParams } from "react-router-dom";
import { Field } from "../../components/Field/Field";
import { findById, updateById } from "../../services/register";
import { useEffect, useState } from "react";
import { CreateUserDto } from "../../interfaces";
import type { ChangeEvent, FormEvent } from 'react';


const ResetPasswordForm = () => {
    const { id} = useParams()
    const [user, setUser] = useState<CreateUserDto | undefined>(undefined);
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await findById(id || '');
                setUser(response.data);
        
            } catch (error) {
                console.log(error);
            }
        }
        getUser();
    }, [])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value } as CreateUserDto);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (user?.password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            updateById(id || '', user);

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
                    value={user?.password }
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