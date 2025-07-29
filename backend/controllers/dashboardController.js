const Recipe = require('../models/Recipe');
const MoodMeal = require('../models/MoodMeal');
const User = require('../models/User');
const Suggestion = require('../models/Suggestion');
const ActivityLog = require('../models/ActivityLog');

exports.getDashboardMetrics = async (req, res) => {
  try {
    const [
      totalRecipes,
      moodMeals,
      totalUsers,
      suggestions,
      aiSuggestion,
      recentActivity
    ] = await Promise.all([
      Recipe.countDocuments(),
      MoodMeal.countDocuments(),
      User.countDocuments(),
      Suggestion.countDocuments(),
      Suggestion.findOne().sort({ createdAt: -1 }), // latest suggestion as AI suggestion
      ActivityLog.find().sort({ createdAt: -1 }).limit(5).populate('user', 'fullName email')
    ]);

    res.json({
      totalRecipes,
      moodMeals,
      totalUsers,
      suggestions,
      aiSuggestion: aiSuggestion ? aiSuggestion.text : 'No suggestions yet.',
      recentActivity
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 