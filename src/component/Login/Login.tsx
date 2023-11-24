import React, { useState } from 'react';
import styles from "./Login.module.css";
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { Button, TextField } from '@mui/material';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();
    const credential = useSelector((state: { loginSlice: { userName: string; password: string } }) => state.loginSlice);

    const inputFields = [
        {
            id: 'username',
            type: 'text',
            label: 'Username',
            value: username,
            onChange: (e: any) => setUsername(e.target.value),
        },
        {
            id: 'password',
            type: 'password',
            label: 'Password',
            value: password,
            onChange: (e: any) => setPassword(e.target.value),
        },
    ];

    const handleLogin = () => {
        if (username === credential.userName && password === credential.password) {
            router.push("/home");
        } else {
            alert('Please enter correct username and password.');
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Login</h2>
            <div className={styles.inputContainer}>
                {inputFields.map((field) => (
                    <div key={field.id} >
                        <TextField
                            label={field.label}
                            type={field.type}
                            id={field.id}
                            value={field.value}
                            onChange={field.onChange}
                            className={styles.input}
                        />
                    </div>
                ))}
            </div>

            <button className={styles.button} onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
