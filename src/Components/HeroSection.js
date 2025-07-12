import React, { useState } from 'react';
import '../styles/HeroSection.css';
import { Link, useNavigate } from 'react-router-dom';

/**
 * HeroSection
 * This is the main landing/hero section of the app.
 * It includes animated branding text, a search bar, and navigation buttons.
 */
const HeroSection = () => {
  const [query, setQuery] = useState('');      // Stores ingredient search input
  const [hovered, setHovered] = useState(false); // For hover effect on title
  const navigate = useNavigate();              // Navigation hook from React Router

  /**
   * Handles the ingredient search button click
   * Redirects to /search page with the ingredient query
   */
  const handleSearch = () => {
    if (query.trim() !== '') {
      navigate(`/search?ingredient=${encodeURIComponent(query)}`);
    }
  };

  return (
    <section className="hero-container">
      <div className="overlay">
        <div className="glass-box">
          <div className="hero-text">

            {/* Animated rainbow-colored title */}
            <div className={`title-wrapper ${hovered ? 'enlarged' : ''}`}>
              <h1 className="glass-title">
                {'Cook Freely with AI'.split('').map((char, i) => (
                  <span
                    key={i}
                    className="rainbow-letter"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </h1>
            </div>

            {/* Auto-scrolling subheading text */}
            <div className="auto-scroll-text">
              <span>
                Paste or upload a recipe, select your dietary needs or allergies, and get a tailored recipe with smart substitutions.
              </span>
            </div>

            {/* Ingredient search bar */}
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search ingredients (e.g., milk)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="search-btn" onClick={handleSearch}>
                Search
              </button>
            </div>

            {/* Navigation buttons: Replacer, RecipeBot, Register */}
            <div
              className="hero-buttons"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <Link to="/replacer" className="no-underline">
                <button className="btn green">Try Replacer</button>
              </Link>
              <Link to="/recipebot" className="no-underline">
                <button className="btn blue">Ask RecipeBot</button>
              </Link>
              <Link to="/register" className="no-underline">
                <button className="btn yellow">Join Now</button>
              </Link>
              <Link to="/saved-recipes" className="no-underline"><button className="btn red">Saved Recipes</button></Link>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
