const Recipe = require('../models/Recipe');

exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getRecipeCount = async (req, res) => {
  try {
    const count = await Recipe.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, steps } = req.body;
    const recipe = new Recipe({
      title,
      description,
      ingredients,
      steps,
      createdBy: req.user.id
    });
    await recipe.save();
    res.status(201).json(recipe);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}; 