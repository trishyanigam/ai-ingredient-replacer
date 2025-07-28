import React, { useState } from 'react';
import '../styles/Register.css';
import { registerUser } from '../api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!fullName || !email || !password) {
      setError('All fields are required');
      return;
    }

    if (!email.endsWith('@gmail.com')) {
      setError('Email must end with @gmail.com');
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])/;
    if (!passwordRegex.test(password)) {
      setError('Password must contain at least one uppercase letter and one symbol');
      return;
    }

    try {
      const response = await registerUser({ fullName, email, password });
      alert('Registration successful');
      setFullName('');
      setEmail('');
      setPassword('');
      navigate('/dashboard');
    } catch (err) {
      console.error('Registration failed:', err.message);
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email (@gmail.com)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Register</button>
        <p className="switch-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
