import React from 'react';
import './Recipes.css';

const Recipes = () => {
  return (
    <div className="recipes-container">
      <h2>Featured Recipes</h2>
      <p className="subheading">Explore healthy, allergy-safe, and AI-optimized recipes</p>

      <div className="recipe-cards">
        <div className="recipe-card">
          <h3>Vegan Pancakes</h3>
          <p>Fluffy pancakes made with almond milk and flaxseed.</p>
        </div>
        <div className="recipe-card">
          <h3>Gluten-Free Pasta</h3>
          <p>Delicious rice flour pasta served with veggie sauce.</p>
        </div>
        <div className="recipe-card">
          <h3>Nut-Free Brownies</h3>
          <p>Chocolatey brownies using sunflower seed butter.</p>
        </div>
      </div>
    </div>
  );
};

export default Recipes;
