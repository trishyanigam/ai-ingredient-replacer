import React, { useState } from 'react';
import './HeroSection.css';
import { Link, useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query, setQuery] = useState('');
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

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
            <div className={`title-wrapper ${hovered ? 'enlarged' : ''}`}>
              <h1 className="glass-title">
                {'Cook Freely with AI'.split('').map((char, i) => (
                  <span key={i} className="rainbow-letter" style={{ animationDelay: `${i * 0.1}s` }}>
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </h1>
            </div>

            <div className="auto-scroll-text">
              <span>
                Paste or upload a recipe, select your dietary needs or allergies, and get a tailored recipe with smart substitutions.
              </span>
            </div>

            <div className="search-bar">
              <input
                type="text"
                placeholder="Search ingredients (e.g., milk)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="search-btn" onClick={handleSearch}>Search</button>
            </div>

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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
