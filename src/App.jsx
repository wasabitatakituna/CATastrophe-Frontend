import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';

// components
import Nav from './components/Nav.jsx'
// pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup'
import Profile from './pages/Profile';
import CreatePost from './pages/Create-Post.jsx';

// css
import './css/App.css'

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/auth/profile', {
      credentials: 'include'
    })
    .then(res => res.ok ? res.json() : null)
    .then(data => setUser(data))
  }, []);

    const handleLogin = (user) => {
      setUser(user);
    };

    const handleLogout = async () => {
      await fetch('http://localhost:4000/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      setUser(null);
    };

  return (
    <div>
      <Nav token={user} onLogout={handleLogout} />

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/signup"
          element={
            <Signup
              signup={handleLogin}
            />
          }
        />

        <Route
          path="/login"
          element={
            <Login
              login={handleLogin}
            />
          }
        />

        <Route
          path="/profile"
          element={
            user ? <Profile token={user} /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/create-post"
          element={
            user ? <CreatePost token={user} /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </div>
  )
}

export default App
