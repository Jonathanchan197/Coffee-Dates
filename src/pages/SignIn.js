import React, {useState} from 'react';
import {useAuth} from '../auth';

const Signin = () => {
    const auth = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSignIn = async (e) => {
        e.preventDefault();
        const signIn =  await auth.login(email, password);

        if(signIn.error){
            setMessage(signIn.error.message)
        } else {
            setMessage("Successfully Logged in");
        } 

        setPassword("");
    }

    return (
        <div>
            {message && message}
        <h1>This is Signin</h1>

        <form onSubmit={handleSignIn}>
            <input type="email" value={email} onChange={ e => setEmail(e.target.value)} />
            <input type="password" value={password} onChange={ e => setPassword(e.target.value)} />
            <button type={'submit'}>Login</button>
        </form>
        </div>
    );
};

export default Signin;