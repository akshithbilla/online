// src/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';  // External CSS for styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle authentication logic here
    // On successful login, redirect to home page
    navigate('/productshome');
  };

  return (
    <div className="auth-container">
      <div className="logo">
        <h1>Shoppy</h1>
      </div>
      <form onSubmit={handleLogin}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <div className="social-login">
        <p>Or login with</p>
        <button className="facebook-btn">Facebook</button>
        <button className="google-btn">Google</button>
      </div>
    </div>
  );
};

export default Login;
