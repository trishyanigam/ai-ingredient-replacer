import React from 'react';
import './HeroSection.css';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="hero-container">
      <div className="overlay">
        <div className="hero-text">
          <h1>Cook Freely with AI</h1>
          <p>
            Paste or upload a recipe, select your dietary needs or allergies, and get a tailored recipe with smart substitutions.
          </p>
          <div className="search-bar">
            <input type="text" placeholder="Search ingredients (e.g., milk)" />
            <button className="search-btn">Search</button>
          </div>
          <div className="hero-buttons">
            <Link to="/replacer" className="no-underline"><button  className="btn green">Try Replacer</button></Link>
            <Link to="/replacer" className="no-underline"><button className="btn blue">Ask RecipeBot</button></Link>
            <Link to="/replacer" className="no-underline"><button className="btn yellow">Join Now</button></Link>
             <Link to="/saved-recipes" className="no-underline">
              <button className="btn orange">Saved Recipes</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
