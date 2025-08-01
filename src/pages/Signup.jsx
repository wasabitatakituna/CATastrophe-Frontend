import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup({ signup }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:4000/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        const data = await res.json();
        if (res.ok) {
            signup(data.token);
            alert("Sign up Successful.");
            navigate('/');
        }
        else {
            alert(data.error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3 className="head">Signup</h3>
            <br/>
            <label for="signUpUsername">Username:</label>
            <input
                id="signUpUsername"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <br/>
            <label for="signUpPassword">Password:</label>
            <input
                id="signUpPassword"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br/><br/>
            <button type="submit">Signup</button>
        </form>
    );
}