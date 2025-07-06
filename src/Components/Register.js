import React from 'react';
import './Register.css';

const Register = () => {
  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form className="auth-form">
        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Register</button>
        <p className="switch-link">Already have an account? <a href="/login">Login</a></p>
      </form>
    </div>
  );
};

export default Register;
