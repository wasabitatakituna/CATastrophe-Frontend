import { Link, useNavigate } from 'react-router-dom';

export default function Nav({ token, onLogout }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <header id="title">
                <h2>CATastrophe</h2>
                {!token ? (
                    <></>
                ) : (
                    <button id="logout" onClick={handleLogout}>Logout</button>
                )}
            </header>

            <div id="links">
                <Link to="/" className="nav-link">Home</Link>
                {!token ? (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </>
                ) : (
                    <>
                        <Link to="/profile">Profile</Link>
                        <Link to="/create-post">Post</Link>
                    </>
                )}
            </div>
        </nav>
    );
}