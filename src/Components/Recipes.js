import React, { useEffect, useState } from 'react';
import './Recipes.css';

const defaultRecipes = [
  {
    name: 'Vegan Pancakes',
    description: 'Fluffy pancakes made with almond milk and flaxseed.',
  },
  {
    name: 'Gluten-Free Pasta',
    description: 'Delicious rice flour pasta served with veggie sauce.',
  },
  {
    name: 'Nut-Free Brownies',
    description: 'Chocolatey brownies using sunflower seed butter.',
  },
];

const Recipes = () => {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState(defaultRecipes);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const voiceQuery = localStorage.getItem('voiceSearch');
    if (voiceQuery) {
      setQuery(voiceQuery);
      fetchRecipes(voiceQuery);
      localStorage.removeItem('voiceSearch');
    }
  }, []);

  const fetchRecipes = async (dishName) => {
    if (!dishName.trim()) return;
    setLoading(true);
    try {
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer YOUR_API_KEY`,
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'user',
              content: `Give me a detailed recipe for ${dishName}. Only return the recipe in short format with title and ingredients.`,
            },
          ],
        }),
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('API response:', data);

      const content = data.choices?.[0]?.message?.content || 'No recipe found';

      setRecipes([
        {
          name: dishName.charAt(0).toUpperCase() + dishName.slice(1),
          description: content,
        },
      ]);
    } catch (err) {
      console.error('Error fetching recipe:', err);
      setRecipes([{ name: 'Error', description: 'Failed to fetch recipe.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const dish = e.target.value;
    setQuery(dish);
    if (dish.trim()) {
      fetchRecipes(dish);
    } else {
      setRecipes(defaultRecipes);
    }
  };

  return (
    <div className="recipes-container">
      <h2>Featured Recipes</h2>
      <p className="subheading">Explore healthy, allergy-safe, and AI-optimized recipes</p>

      <input
        type="text"
        placeholder="Search for any dish..."
        value={query}
        onChange={handleSearch}
        className="recipe-search"
      />

      {loading ? (
        <p>Loading recipe from AI...</p>
      ) : (
        <div className="recipe-cards">
          {recipes.map((recipe, index) => (
            <div className="recipe-card" key={index}>
              <h3>{recipe.name}</h3>
              <pre style={{ whiteSpace: 'pre-wrap' }}>{recipe.description}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recipes;
