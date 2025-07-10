import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VoiceSearch = () => {
  const [listening, setListening] = useState(false);
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  const navigate = useNavigate();

  recognition.lang = 'en-US';
  recognition.interimResults = false;

  const handleVoiceSearch = () => {
    setListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setListening(false);

      // Store transcript in localStorage to be used in Recipes page
      localStorage.setItem('voiceSearch', transcript);

      // Navigate to /recipes
      navigate('/recipes');
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setListening(false);
    };

    recognition.onend = () => setListening(false);
  };

  return (
    <button onClick={handleVoiceSearch} style={styles.button}>
       {listening ? 'Listening...' : 'Voice Search'}
    </button>
  );
};

const styles = {
  button: {
    padding: '10px 20px',
    borderRadius: '20px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#00c896',
    color: '#fff',
    fontWeight: 'bold',
  }
};

export default VoiceSearch;
