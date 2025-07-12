import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import VoiceSearch from './VoiceSearch'; // ✅ Import the mic button

/**
 * Navbar
 * Displays the top navigation bar with logo, navigation links, and auth buttons.
 * Uses React Router's <Link> for client-side navigation.
 */
const Navbar = () => {
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
        <li><Link to="/">Home</Link></li>
        <li><Link to="/replacer">Replacer</Link></li>
        <li><Link to="/chatbot">Chatbot</Link></li>
        <li><Link to="/recipes">Recipes</Link></li>
        <li><Link to="/community">Community</Link></li>
        <li><Link to="/shopping">Shopping</Link></li>
        <li><Link to="/moodmeals">MoodMeals</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
      </ul>

      {/* Authentication Buttons (Right Section) */}
      <div className="navbar-right">
        <VoiceSearch /> {/* ✅ Mic button added here */}
        <Link to="/login" className="no-underline">
          <button className="nav-btn login">Login</button>
        </Link>
        <Link to="/register" className="no-underline">
          <button className="nav-btn register">Register</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
