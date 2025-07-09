import React, { useState } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! I’m your AI food assistant. Ask me anything about diet-friendly recipes!' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { sender: 'user', text: input }]);
    setInput('');

    // Add an empty bot message for streaming
    setMessages(prev => [...prev, { sender: 'bot', text: 'Lets go...... ' }]);

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_API_KEY'
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat-v3-0324:free",
          stream: true,
          messages: [
            {
              role: "system",
              content: "You are an expert AI assistant for ingredient replacement and dietary advice. Only answer questions related to food, recipes, ingredient substitutions, allergies, and healthy cooking. If asked about anything else, politely redirect the user to food-related topics. Answer questions like human in simple words use emojis wherever posiible."
            },
            ...messages.map(m => ({
              role: m.sender === 'user' ? 'user' : 'assistant',
              content: m.text
            })),
            {
              role: "user",
              content: input
            }
          ]
        })
      });

      if (!response.body) throw new Error('No response body');
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let done = false;
      let botText = '';
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          // OpenRouter streams lines like: data: {json}\n\n
          chunk.split('\n').forEach(line => {
            if (line.startsWith('data:')) {
              const data = line.replace('data:', '').trim();
              if (data === '[DONE]') return;
              try {
                const json = JSON.parse(data);
                const delta = json.choices?.[0]?.delta?.content;
                if (delta) {
                  botText += delta;
                  setMessages(prev => {
                    // Update the last bot message
                    const updated = [...prev];
                    updated[updated.length - 1] = { sender: 'bot', text: botText };
                    return updated;
                  });
                }
              } catch (e) { /* ignore parse errors for incomplete chunks */ }
            }
          });
        }
      }
    } catch (error) {
      setMessages(prev => [
        ...prev.slice(0, -1),
        { sender: 'bot', text: 'Sorry, something went wrong.' }
      ]);
    }
  };

  return (
    <div className="chatbot-container">
      <h2>AI Chat Assistant</h2>

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
          placeholder="Ask a question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
