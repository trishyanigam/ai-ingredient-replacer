import React, { useState, useRef } from 'react';
import '../styles/Chatbot.css'; // Reuse existing chatbot styles

/**
 * FoodChatAssistant
 * A responsive AI-powered chatbot for dietary and recipe-related queries.
 * Integrates with OpenRouter API to stream responses.
 */
const FoodChatAssistant = () => {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: '👋 Hi! I’m your AI food assistant. Ask me anything about diet-friendly recipes!'
    }
  ]);

  const [userInput, setUserInput] = useState('');
  const botTextRef = useRef(''); // Fix for ESLint no-loop-func warning

  const handleUserMessage = async () => {
    if (!userInput.trim()) return;

    const updatedMessages = [
      ...messages,
      { sender: 'user', text: userInput },
      { sender: 'bot', text: 'Thinking... 🤔' }
    ];
    setMessages(updatedMessages);
    setUserInput('');
    botTextRef.current = ''; // Reset bot text before response starts

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_API_KEY' // Replace with your actual API key
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat-v3-0324:free",
          stream: true,
          messages: [
            {
              role: "system",
              content:
                "You are an expert AI assistant for ingredient replacement and dietary advice. Only answer questions related to food, recipes, ingredient substitutions, allergies, and healthy cooking. If asked about anything else, politely redirect the user to food-related topics. Answer like a human in simple words, use emojis wherever possible."
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
          { sender: 'bot', text: '⚠️ API call limit exceeded. Try again later.' }
        ]);
        return;
      }

      if (!response.body) throw new Error('No response body from server');

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let done = false;

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
                  botTextRef.current += delta;

                  setMessages(prev => {
                    const updated = [...prev];
                    updated[updated.length - 1] = { sender: 'bot', text: botTextRef.current };
                    return updated;
                  });
                }
              } catch (e) {
                // Ignore incomplete JSON
              }
            }
          });
        }
      }

      // Reset for next interaction
      botTextRef.current = '';

    } catch (error) {
      setMessages(prev => [
        ...prev.slice(0, -1),
        { sender: 'bot', text: '❌ Sorry, something went wrong. Please try again.' }
      ]);
    }
  };

  return (
    <div className="chatbot-container">
      <h2>🍽️ Ask Your Recipe Assistant</h2>

      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>

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
