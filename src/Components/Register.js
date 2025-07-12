import React from 'react';
import '../styles/Register.css';

/**
 * Register
 * A simple registration form component for new users.
 * Collects name, email, and password. Includes a link to the login page.
 */
const Register = () => {
  return (
    <div className="auth-container">
      {/* Section Title */}
      <h2>Register</h2>

      {/* Registration Form */}
      <form className="auth-form">

        {/* Full Name Field */}
        <input
          type="text"
          placeholder="Full Name"
          required
        />

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
        <button type="submit">Register</button>

        {/* Login Redirect Link */}
        <p className="switch-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
