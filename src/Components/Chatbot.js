// FoodChatAssistant.js
import React, { useState } from 'react';
import '../styles/Chatbot.css'; // Reuse existing chatbot styles

/**
 * FoodChatAssistant
 * A responsive AI-powered chatbot for dietary and recipe-related queries.
 * Integrates with OpenRouter API to stream responses.
 */
const FoodChatAssistant = () => {
  // State to store the chat history
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: '👋 Hi! I’m your AI food assistant. Ask me anything about diet-friendly recipes!'
    }
  ]);

  // State to track user input in the chat field
  const [userInput, setUserInput] = useState('');

  /**
   * Handles user message submission and fetches bot response via OpenRouter stream
   */
  const handleUserMessage = async () => {
    if (!userInput.trim()) return;

    // Add user message and a loading message from the bot
    const updatedMessages = [
      ...messages,
      { sender: 'user', text: userInput },
      { sender: 'bot', text: 'Thinking... 🤔' }
    ];
    setMessages(updatedMessages);
    setUserInput('');

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_API_KEY' // Replace with secure token
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat-v3-0324:free",
          stream: true,
          messages: [
            {
              role: "system",
              content: "You are an expert AI assistant for ingredient replacement and dietary advice. Only answer questions related to food, recipes, ingredient substitutions, allergies, and healthy cooking. If asked about anything else, politely redirect the user to food-related topics. Answer like a human in simple words, use emojis wherever possible."
            },
            ...updatedMessages.map(m => ({
              role: m.sender === 'user' ? 'user' : 'assistant',
              content: m.text
            }))
          ]
        })
      });

      if (response.status === 429) {
        setMessages(prev => [
          ...prev.slice(0, -1),
          { sender: 'bot', text: 'API call limit exceeded' }
        ]);
        return;
      }

      if (!response.body) throw new Error('No response body from server');

      // Stream and decode bot response in real-time
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let done = false;
      let botText = '';

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          chunk.split('\n').forEach(line => {
            if (line.startsWith('data:')) {
              const data = line.replace('data:', '').trim();
              if (data === '[DONE]') return;

              try {
                const json = JSON.parse(data);
                const delta = json.choices?.[0]?.delta?.content;

                if (delta) {
                  botText += delta;

                  // Update the last bot message with streamed content
                  setMessages(prev => {
                    const updated = [...prev];
                    updated[updated.length - 1] = { sender: 'bot', text: botText };
                    return updated;
                  });
                }
              } catch (e) {
                // Ignore JSON parse errors (incomplete chunks)
              }
            }
          });
        }
      }
    } catch (error) {
      // Replace "Thinking..." with error message
      setMessages(prev => [
        ...prev.slice(0, -1),
        { sender: 'bot', text: '❌ Sorry, something went wrong. Please try again.' }
      ]);
    }
  };

  return (
    <div className="chatbot-container">
      <h2>🍽️ Ask Your Recipe Assistant</h2>

      {/* Chat history window */}
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>

      {/* User input field + send button */}
      <div className="chat-input">
        <input
          type="text"
          placeholder="Ask a food-related question..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleUserMessage()}
        />
        <button onClick={handleUserMessage}>Send</button>
      </div>
    </div>
  );
};

export default FoodChatAssistant;
