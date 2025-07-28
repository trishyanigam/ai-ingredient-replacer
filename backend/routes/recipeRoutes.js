const express = require('express');
const router = express.Router();
const { getAllRecipes, getRecipeCount, addRecipe } = require('../controllers/recipeController');
const auth = require('../middleware/auth');

router.get('/', getAllRecipes);
router.get('/count', getRecipeCount);
router.post('/', auth, addRecipe);

module.exports = router; 