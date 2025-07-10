import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import VoiceSearch from './VoiceSearch'; // ✅ Import the mic button

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={`${process.env.PUBLIC_URL}/FoodFitAIlogo.png`} alt="Logo" className="logo" />
        <span className="app-name">FoodFit AI</span>
      </div>

      <ul className="navbar-center">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/replacer">Replacer</Link></li>
        <li><Link to="/chatbot">Chatbot</Link></li>
        <li><Link to="/recipes">Recipes</Link></li>
        <li><Link to="/community">Community</Link></li>
        <li><Link to="/shopping">Shopping</Link></li>
        <li><Link to="/moodmeals">MoodMeals</Link></li>
      </ul>

      <div className="navbar-right">
        <VoiceSearch /> {/* ✅ Mic button added here */}
        <Link to="/login" className="no-underline"><button className="nav-btn login">Login</button></Link>
        <Link to="/register" className="no-underline"><button className="nav-btn register">Register</button></Link>
      </div>
    </nav>
  );
};

export default Navbar;
