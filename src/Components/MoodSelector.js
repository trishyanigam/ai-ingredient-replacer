import React, { useState } from 'react';
import './MoodSelector.css';

const moodSuggestions = {
  low: ['Oatmeal with banana', 'Avocado toast', 'Lentil soup'],
  party: ['Nacho platter', 'Mini sliders', 'Fruit punch with lime'],
  post: ['Grilled chicken with quinoa', 'Protein smoothie with banana and peanut butter', 'Tofu stir fry with brown rice'],
};

const MoodSelector = () => {
  const [selectedMood, setSelectedMood] = useState('');
  const [customMood, setCustomMood] = useState('');
  const [recommendations, setRecommendations] = useState([]);

  const handleMoodClick = (moodKey) => {
    setSelectedMood(moodKey);
    setCustomMood('');
    setRecommendations(moodSuggestions[moodKey] || []);
  };

  const handleCustomInput = (e) => {
    setCustomMood(e.target.value);
    setSelectedMood('');
  };

  const handleSubmit = () => {
    const mood = customMood.toLowerCase();
    if (mood.includes('energy')) {
      handleMoodClick('low');
    } else if (mood.includes('gym') || mood.includes('workout')) {
      handleMoodClick('post');
    } else if (mood.includes('party') || mood.includes('celebrate')) {
      handleMoodClick('party');
    } else {
      setRecommendations([
        'Mixed greens salad with nuts',
        'Fruit & yogurt parfait',
        'Veggie wrap with hummus',
      ]);
    }
  };

  return (
    <div className="mood-container">
      <h2>
        Select or Type Your Mood <span role="img" aria-label="brain">🧠</span>
      </h2>

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
