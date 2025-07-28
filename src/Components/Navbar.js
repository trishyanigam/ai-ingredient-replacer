import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import VoiceSearch from './VoiceSearch';
import { AuthContext } from '../context/AuthContext';

/**
 * Navbar
 * Displays the top navigation bar with logo, navigation links, and auth buttons.
 * Uses React Router's <Link> for client-side navigation.
 * Shows different options based on authentication status.
 */
const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      
      {/* Logo and App Name (Left Section) */}
      <div className="navbar-left">
        <img
          src={`${process.env.PUBLIC_URL}/FoodFitAIlogo.png`}
          alt="Logo"
          className="logo"
        />
        <span className="app-name">FoodFit AI</span>
      </div>

      {/* Navigation Links (Center Section) */}
      <ul className="navbar-center">
        {!isLoggedIn ? (
          // Show only Home for non-logged-in users
          <li><Link to="/">Home</Link></li>
        ) : (
          // Show all features except Home for logged-in users
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/replacer">Replacer</Link></li>
            <li><Link to="/chatbot">Chatbot</Link></li>
            <li><Link to="/recipes">Recipes</Link></li>
            <li><Link to="/community">Community</Link></li>
            <li><Link to="/shopping">Shopping</Link></li>
            <li><Link to="/moodmeals">MoodMeals</Link></li>
          </>
        )}
      </ul>

      {/* Authentication Buttons (Right Section) */}
      <div className="navbar-right">
        <VoiceSearch />
        {!isLoggedIn ? (
          // Show Login and Register for non-logged-in users
          <>
            <Link to="/login" className="no-underline">
              <button className="nav-btn login">Login</button>
            </Link>
            <Link to="/register" className="no-underline">
              <button className="nav-btn register">Register</button>
            </Link>
          </>
        ) : (
          // Show Logout for logged-in users
          <button className="nav-btn logout" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
