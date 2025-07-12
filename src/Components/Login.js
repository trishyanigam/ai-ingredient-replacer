import React from 'react';
import '../styles/Login.css';

/**
 * Login
 * A simple login form component that collects user's email and password.
 * Contains a link to the registration page for new users.
 */
const Login = () => {
  return (
    <div className="auth-container">
      {/* Section Title */}
      <h2>Login</h2>

      {/* Login Form */}
      <form className="auth-form">
        {/* Email Field */}
        <input
          type="email"
          placeholder="Email"
          required
        />

        {/* Password Field */}
        <input
          type="password"
          placeholder="Password"
          required
        />

        {/* Submit Button */}
        <button type="submit">Login</button>

        {/* Registration Link */}
        <p className="switch-link">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
