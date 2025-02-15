import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post("http://localhost:3000/chat", { message: input });
      const botMessage = { sender: "bot", text: response.data.reply || "Sorry, I couldn't understand." };

      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages([...messages, userMessage, { sender: "bot", text: "Error connecting to the server." }]);
    }

    setInput(""); // Clear input field
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="chatbot-button">
        Chat with AI!
      </button>

      {/* Chatbot Box */}
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <span><b>AI Assistant ✦ Powered by Gemini </b></span>
            <button onClick={() => setIsOpen(false)} className="close-btn">Close</button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me about tax information ᯓ★"
            />
            <button onClick={sendMessage} className="send-btn">➤</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
