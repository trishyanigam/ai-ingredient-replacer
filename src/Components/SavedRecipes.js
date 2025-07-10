import React, { useEffect, useState } from 'react';
import './SavedRecipes.css';

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('savedRecipes')) || [];
    setSavedRecipes(stored);
  }, []);

  const handleRemove = (id) => {
    const updatedRecipes = savedRecipes.filter(recipe => recipe.id !== id);
    setSavedRecipes(updatedRecipes);
    localStorage.setItem('savedRecipes', JSON.stringify(updatedRecipes));
  };

  return (
    <div className="saved-recipes-container">
      <h2>Your Saved Recipes</h2>
      <div className="recipe-list">
        {savedRecipes.length === 0 ? (
          <p>No saved recipes yet.</p>
        ) : (
          savedRecipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <h3>{recipe.title}</h3>
              {/* <p><strong>Summary:</strong> {recipe.description}</p> */}
              <pre style={{ whiteSpace: 'pre-wrap' }}>{recipe.content}</pre>
              <button className="btn remove-btn" onClick={() => handleRemove(recipe.id)}>
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SavedRecipes;
