import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ login }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:4000/auth/login', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        if (res.ok) {
            login(data.user);
            alert("Log in Successful.");
            navigate('/');
        }
        else {
            alert(data.error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3 className="head">Login</h3>
            <br/>
            <label for="signUpUsername">Username:</label>
            <input
                id="loginUsername"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <br/>
            <label for="signUpPassword">Password:</label>
            <input
                id="loginPassword"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br/><br/>
            <button type="submit">Login</button>
        </form>
    );
}