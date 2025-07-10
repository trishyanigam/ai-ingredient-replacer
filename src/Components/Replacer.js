import React, { useState } from 'react';
import './Replacer.css';

const Replacer = () => {
  const [recipe, setRecipe] = useState('');
  const [preferences, setPreferences] = useState({
    vegan: false,
    nutFree: false,
    glutenFree: false,
    dairyFree: false,
    eggFree: false,
    sugarFree: false,
  });
  const [output, setOutput] = useState('');
  const [explanations, setExplanations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCheckboxChange = (e) => {
    setPreferences({
      ...preferences,
      [e.target.name]: e.target.checked,
    });
  };

  const handleReplace = async () => {
    if (!recipe.trim()) {
      setOutput('Please enter a recipe.');
      setExplanations([]);
      return;
    }
    setLoading(true);
    setOutput('');
    setExplanations([]);
    try {
      // Get the latest preferences directly
      const userPrefs = [];
      if (document.querySelector('input[name="vegan"]').checked) userPrefs.push('vegan');
      if (document.querySelector('input[name="nutFree"]').checked) userPrefs.push('nut-free');
      if (document.querySelector('input[name="glutenFree"]').checked) userPrefs.push('gluten-free');
      if (document.querySelector('input[name="dairyFree"]').checked) userPrefs.push('dairy-free');
      if (document.querySelector('input[name="eggFree"]').checked) userPrefs.push('egg-free');
      if (document.querySelector('input[name="sugarFree"]').checked) userPrefs.push('sugar-free');
      const systemPrompt = `You are an expert AI ingredient replacer. Given a recipe and dietary preferences (${userPrefs.join(", ") || 'none'}), return the modified recipe with smart ingredient substitutions. After the recipe, provide a short bullet list of what was replaced and why. Only change ingredients that conflict with the preferences. Format the output as:\n\nModified Recipe:\n<recipe>\n\nReplacements Made:\n- <explanation1>\n- <explanation2>\nUse simple language and emojis where possible.`;
      const userMessage = `Recipe:\n${recipe}\n\nPreferences: ${userPrefs.length > 0 ? userPrefs.join(", ") : 'none'}`;
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer API_KEY' 
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat-v3-0324:free",
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage }
          ]
        })
      });
      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || 'Sorry, could not generate a response.';
      // Parse the reply into recipe and explanations
      const [_, modRecipe, __, ...exps] = reply.split(/Modified Recipe:|Replacements Made:/);
      setOutput(modRecipe ? modRecipe.trim() : reply.trim());
      setExplanations(
        exps.length > 0
          ? exps.join('').split(/\n|•|-/).map(s => s.trim()).filter(Boolean)
          : []
      );
    } catch (err) {
      setOutput('Sorry, something went wrong.');
      setExplanations([]);
    } finally {
      setLoading(false);
    }
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

  const sampleRecipesLeft = [
    {
      name: 'Classic Pancakes',
      text: `Classic Pancakes\n\nIngredients:\n- 1 cup flour\n- 2 tbsp sugar\n- 1 cup milk\n- 1 egg\n- 2 tbsp butter\n- 1 tsp baking powder\n- Pinch of salt\n\nInstructions:\n1. Mix dry ingredients.\n2. Add wet ingredients and whisk.\n3. Cook on a hot griddle until golden.`
    },
    {
      name: 'Spaghetti Carbonara',
      text: `Spaghetti Carbonara\n\nIngredients:\n- 200g spaghetti\n- 100g pancetta\n- 2 eggs\n- 50g parmesan cheese\n- 1 clove garlic\n- Salt & pepper\n\nInstructions:\n1. Cook spaghetti.\n2. Fry pancetta with garlic.\n3. Mix eggs and cheese.\n4. Combine all and season.`
    },
    {
      name: 'Banana Bread',
      text: `Banana Bread\n\nIngredients:\n- 3 ripe bananas\n- 1/3 cup melted butter\n- 1 cup sugar\n- 1 egg\n- 1 tsp vanilla\n- 1 tsp baking soda\n- Pinch of salt\n- 1.5 cups flour\n\nInstructions:\n1. Mash bananas.\n2. Mix in butter, sugar, egg, vanilla.\n3. Add dry ingredients.\n4. Bake at 350°F for 1 hour.`
    }
  ];

  const sampleRecipesRight = [
    {
      name: 'Vegetable Stir Fry',
      text: `Vegetable Stir Fry\n\nIngredients:\n- 1 cup broccoli florets\n- 1 bell pepper, sliced\n- 1 carrot, julienned\n- 2 tbsp soy sauce\n- 1 tbsp olive oil\n- 1 clove garlic, minced\n- 1 tsp ginger, grated\n\nInstructions:\n1. Heat oil in a pan.\n2. Add garlic and ginger, sauté.\n3. Add vegetables and stir fry.\n4. Add soy sauce and cook until veggies are tender.`
    },
    {
      name: 'Chicken Caesar Salad',
      text: `Chicken Caesar Salad\n\nIngredients:\n- 2 cups romaine lettuce\n- 1 grilled chicken breast, sliced\n- 1/4 cup parmesan cheese\n- 1/2 cup croutons\n- Caesar dressing\n\nInstructions:\n1. Toss lettuce with dressing.\n2. Top with chicken, cheese, and croutons.`
    },
    {
      name: 'Tomato Soup',
      text: `Tomato Soup\n\nIngredients:\n- 4 ripe tomatoes, chopped\n- 1 onion, chopped\n- 2 cloves garlic, minced\n- 2 cups vegetable broth\n- 1 tbsp olive oil\n- Salt & pepper\n\nInstructions:\n1. Sauté onion and garlic.\n2. Add tomatoes and cook.\n3. Add broth, simmer 20 min.\n4. Blend and season.`
    }
  ];

  return (
    <>
      {/* Floating sample recipes bar - Left */}
      <div className="floating-recipes-bar left">
        <span>Try a sample recipe:</span>
        {sampleRecipesLeft.map((rec, idx) => (
          <button
            key={idx}
            className="sample-recipe-btn"
            onClick={() => setRecipe(rec.text)}
            type="button"
          >
            {rec.name}
          </button>
        ))}
      </div>
      {/* Floating sample recipes bar - Right */}
      <div className="floating-recipes-bar right">
        <span>Try a sample recipe:</span>
        {sampleRecipesRight.map((rec, idx) => (
          <button
            key={idx}
            className="sample-recipe-btn"
            onClick={() => setRecipe(rec.text)}
            type="button"
          >
            {rec.name}
          </button>
        ))}
      </div>
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
          <label>
            <input
              type="checkbox"
              name="dairyFree"
              checked={preferences.dairyFree}
              onChange={handleCheckboxChange}
            />
            Dairy-Free
          </label>
          <label>
            <input
              type="checkbox"
              name="eggFree"
              checked={preferences.eggFree}
              onChange={handleCheckboxChange}
            />
            Egg-Free
          </label>
          <label>
            <input
              type="checkbox"
              name="sugarFree"
              checked={preferences.sugarFree}
              onChange={handleCheckboxChange}
            />
            Sugar-Free
          </label>
        </div>
        <button onClick={handleReplace} disabled={loading}>
          {loading ? 'Replacing...' : 'Replace Ingredients'}
        </button>
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
    </>
  );
};

export default Replacer;
