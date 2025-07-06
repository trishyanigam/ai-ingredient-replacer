import React from 'react';
import './HeroSection.css';

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
            <button className="btn green">Try Replacer</button>
            <button className="btn blue">Ask RecipeBot</button>
            <button className="btn yellow">Join Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
