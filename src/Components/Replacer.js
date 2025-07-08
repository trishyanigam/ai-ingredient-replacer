import React, { useState } from 'react';
import './Replacer.css';

const Replacer = () => {
  const [recipe, setRecipe] = useState('');
  const [preferences, setPreferences] = useState({
    vegan: false,
    nutFree: false,
    glutenFree: false,
  });
  const [output, setOutput] = useState('');
  const [explanations, setExplanations] = useState([]);

  const handleCheckboxChange = (e) => {
    setPreferences({
      ...preferences,
      [e.target.name]: e.target.checked,
    });
  };

  const handleReplace = () => {
    let modified = recipe;
    const newExplanations = [];

    if (preferences.vegan) {
      if (/milk/gi.test(modified)) {
        modified = modified.replace(/milk/gi, 'almond milk');
        newExplanations.push("Replaced milk with almond milk (vegan alternative)");
      }
      if (/egg/gi.test(modified)) {
        modified = modified.replace(/egg/gi, 'flaxseed');
        newExplanations.push("Replaced egg with flaxseed (vegan alternative)");
      }
    }

    if (preferences.nutFree) {
      if (/almond/gi.test(modified)) {
        modified = modified.replace(/almond/gi, 'sunflower seed');
        newExplanations.push("Replaced almond with sunflower seed (nut-free option)");
      }
    }

    if (preferences.glutenFree) {
      if (/flour/gi.test(modified)) {
        modified = modified.replace(/flour/gi, 'rice flour');
        newExplanations.push("Replaced flour with rice flour (gluten-free alternative)");
      }
      if (/bread/gi.test(modified)) {
        modified = modified.replace(/bread/gi, 'gluten-free bread');
        newExplanations.push("Replaced bread with gluten-free bread");
      }
    }

    setOutput(modified || 'Please enter a recipe.');
    setExplanations(newExplanations);
  };

  const saveRecipeToLocalStorage = () => {
    if (!output) {
      alert("Please generate a modified recipe first.");
      return;
    }

    const saved = JSON.parse(localStorage.getItem('savedRecipes')) || [];
    const newRecipe = {
      id: Date.now(),
      title: output.split('\n')[0] || 'Untitled Recipe',
      description: explanations.join(', ') || 'No explanation provided.',
      content: output,
    };

    saved.push(newRecipe);
    localStorage.setItem('savedRecipes', JSON.stringify(saved));
    alert('Recipe saved!');
  };

  return (
    <div className="replacer-container">
      <h2>AI Ingredient Replacer</h2>
      
      <textarea
        placeholder="Paste your recipe here..."
        rows={8}
        value={recipe}
        onChange={(e) => setRecipe(e.target.value)}
      />

      <div className="checkboxes">
        <label>
          <input
            type="checkbox"
            name="vegan"
            checked={preferences.vegan}
            onChange={handleCheckboxChange}
          />
          Vegan
        </label>

        <label>
          <input
            type="checkbox"
            name="nutFree"
            checked={preferences.nutFree}
            onChange={handleCheckboxChange}
          />
          Nut-Free
        </label>

        <label>
          <input
            type="checkbox"
            name="glutenFree"
            checked={preferences.glutenFree}
            onChange={handleCheckboxChange}
          />
          Gluten-Free
        </label>
      </div>

      <button onClick={handleReplace}>Replace Ingredients</button>

      {output && (
        <div className="output-box">
          <h3>Modified Recipe:</h3>
          <pre>{output}</pre>
          <button onClick={saveRecipeToLocalStorage}>Save Recipe</button>
        </div>
      )}

      {explanations.length > 0 && (
        <div className="explanation-box">
          <h3>Replacements Made:</h3>
          <ul>
            {explanations.map((exp, idx) => (
              <li key={idx}>{exp}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Replacer;
