import React, { useState } from 'react';
import '../styles/Register.css';

/**
 * Register
 * A simple registration form component for new users.
 * Collects name, email, and password. Includes a link to the login page.
 */
const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    let valid = true;

    // Email validation
    if (!email.endsWith('@gmail.com')) {
      setEmailError('Your email should end with @gmail.com');
      valid = false;
    } else {
      setEmailError('');
    }

    // Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])/;
    if (!passwordRegex.test(password)) {
      setPasswordError('Password should contain one capital letter and one symbol');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      // Handle successful registration
      console.log('Registration successful!');
    }
  };

  return (
    <div className="auth-container">
      {/* Section Title */}
      <h2>Register</h2>

      {/* Registration Form */}
      <form className="auth-form" onSubmit={handleSubmit}>

        {/* Full Name Field */}
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        {/* Email Field */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {emailError && <p className="error-message">{emailError}</p>}

        {/* Password Field */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {passwordError && <p className="error-message">{passwordError}</p>}

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