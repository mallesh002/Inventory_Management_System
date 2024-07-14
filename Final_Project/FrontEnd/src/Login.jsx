import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    
    fetch('http://localhost:8081/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Username or password is wrong');
      }
    })
    .then(data => {
      if (data.role === 'Admin') {
        onLogin('Admin');
        navigate('/dashboard');
      } else {
        onLogin(data.role);
        navigate('/user-landing-page/view-profile');
      }
    })
    .catch(err => setErrorMessage(err.message));
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:8081/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, email }),
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert('Registration successful! You can now log in.');
        setIsSignup(false);
      } else {
        setErrorMessage(data.error);
      }
    })
    .catch(err => setErrorMessage('Error occurred. Please try again.'));
  };

  return (
    <div className="login-container">
      <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={isSignup ? handleSignupSubmit : handleLoginSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {isSignup && (
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        )}
        <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
      </form>
      <button onClick={() => setIsSignup(!isSignup)}>
        {isSignup ? 'Already have an account? Login' : 'New user? Sign Up'}
      </button>
    </div>
  );
}

export default Login;
