import React, { useState } from 'react';
import '../styles/MoodSelector.css';

/**
 * Predefined food suggestions based on mood categories.
 */
const moodSuggestions = {
  low: ['Oatmeal with banana', 'Avocado toast', 'Lentil soup'],
  party: ['Nacho platter', 'Mini sliders', 'Fruit punch with lime'],
  post: ['Grilled chicken with quinoa', 'Protein smoothie with banana and peanut butter', 'Tofu stir fry with brown rice'],
};

/**
 * MoodSelector
 * Allows users to select or type their mood to get tailored food recommendations.
 * Supports both predefined moods and free-text interpretation.
 */
const MoodSelector = () => {
  // State for mood selected via buttons
  const [selectedMood, setSelectedMood] = useState('');

  // State for custom mood input field
  const [customMood, setCustomMood] = useState('');

  // State for food recommendations based on mood
  const [recommendations, setRecommendations] = useState([]);

  /**
   * Handles click on mood button.
   * Sets selected mood, clears custom input, and updates recommendations.
   */
  const handleMoodClick = (moodKey) => {
    setSelectedMood(moodKey);
    setCustomMood('');
    setRecommendations(moodSuggestions[moodKey] || []);
  };

  /**
   * Updates customMood as user types.
   * Clears selected mood if typing in custom field.
   */
  const handleCustomInput = (e) => {
    setCustomMood(e.target.value);
    setSelectedMood('');
  };

  /**
   * Matches custom mood input to predefined moods using keywords.
   * Falls back to default suggestions if no keyword match.
   */
  const handleSubmit = () => {
    const mood = customMood.toLowerCase();

    if (mood.includes('energy')) {
      handleMoodClick('low');
    } else if (mood.includes('gym') || mood.includes('workout')) {
      handleMoodClick('post');
    } else if (mood.includes('party') || mood.includes('celebrate')) {
      handleMoodClick('party');
    } else {
      // Default fallback suggestions
      setRecommendations([
        'Mixed greens salad with nuts',
        'Fruit & yogurt parfait',
        'Veggie wrap with hummus',
      ]);
    }
  };

  return (
    <div className="mood-container">
      {/* Heading */}
      <h2>
        Select or Type Your Mood <span role="img" aria-label="brain">🧠</span>
      </h2>

      {/* Mood Selection Buttons */}
      <div className="mood-options">
        <button
          className={`mood-btn ${selectedMood === 'low' ? 'selected' : ''}`}
          onClick={() => handleMoodClick('low')}
        >
          🥱 Low Energy
        </button>

        <button
          className={`mood-btn ${selectedMood === 'party' ? 'selected' : ''}`}
          onClick={() => handleMoodClick('party')}
        >
          🥳 Party Mode
        </button>

        <button
          className={`mood-btn ${selectedMood === 'post' ? 'selected' : ''}`}
          onClick={() => handleMoodClick('post')}
        >
          😓 Post-gym
        </button>
      </div>

      {/* Custom Mood Input */}
      <div className="custom-input">
        <input
          type="text"
          placeholder="Enter your mood (e.g., stressed, lazy, excited)"
          value={customMood}
          onChange={handleCustomInput}
        />
        <button className="submit-btn" onClick={handleSubmit}>
          Get Suggestions
        </button>
      </div>

      {/* Display Recommendations */}
      {recommendations.length > 0 && (
        <div className="recommendations">
          <h3>Recommended for {selectedMood || customMood}</h3>
          <ul>
            {recommendations.map((item, index) => (
              <li key={index}>🍽️ {item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MoodSelector;
