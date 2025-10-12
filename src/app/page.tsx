// We need to tell Next.js that this is a client-side component
"use client";

// Import React hooks
import { useState, FormEvent } from 'react';

// Define the structure of a chat message
// Define the structure of a phone object
interface Phone {
  model_name: string;
  brand: string;
  price_inr: number;
  image_url?: string;
}

// Update the message to optionally include an array of phones
interface Message {
  text: string;
  isUser: boolean;
  phones?: Phone[];
}

export default function Home() {
  // State to hold the list of messages
  const [messages, setMessages] = useState<Message[]>([]);
  // State for the user's current input
  const [userInput, setUserInput] = useState('');
  // State to know when we are waiting for a reply
  const [isLoading, setIsLoading] = useState(false);

  // This function is called when the user submits the form (sends a message)
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the page from reloading
    if (!userInput.trim()) return; // Don't send empty messages

    setIsLoading(true);
    const userMessage: Message = { text: userInput, isUser: true };
    // Add user's message to the chat
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      // Send the user's message to our backend API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await response.json();

      if (response.ok) {
        // Create the AI message with both the text and the phone data
const aiMessage: Message = { text: data.reply, isUser: false, phones: data.phones };
        // Add AI's response to the chat
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
      } else {
        console.error('API Error:', data.error);
      }

    } catch (error) {
      console.error('Network or other error:', error);
    }

    setUserInput(''); // Clear the input box
    setIsLoading(false);
  };

  return (
    <main className="chat-container">
      <div className="message-list">
        {messages.map((msg, index) => (
  <div key={index} className={`message-container ${msg.isUser ? 'user' : 'ai'}`}>
    <div className="message">
      {msg.text}
    </div>
    {/* If the message has phone data, render the product cards */}
    {msg.phones && msg.phones.length > 0 && (
      <div className="product-cards-container">
        {msg.phones.map((phone, phoneIndex) => (
          <div key={phoneIndex} className="product-card">
            <img src={phone.image_url} alt={phone.model_name} className="product-image" />
            <div className="product-info">
              <h4>{phone.model_name}</h4>
              <p>₹{phone.price_inr.toLocaleString('en-IN')}</p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
))}
        {isLoading && <div className="message ai">Thinking...</div>}
      </div>
      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask about mobile phones..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>Send</button>
      </form>
    </main>
  );
}