import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navigation({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <div className="navbar">
      <div>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
      </div>
      <div>
        {user ? (
          <>
            <span>Welcome, {user.username}!</span>
            <button onClick={handleLogout} style={{ marginLeft: '1rem' }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navigation;
