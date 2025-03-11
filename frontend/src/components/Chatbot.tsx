import React, { useState, useEffect, useRef } from "react";
//import axios from "axios";
import "../styles/Chatbot.css";

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
    const [input, setInput] = useState("");
    const chatboxRef = useRef<HTMLDivElement>(null);

    const toggleChat = () => setIsOpen((prev) => !prev);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: "user", text: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");

       /*try {
            const response = await axios.post("http://localhost:3000/chat", { message: input });
            const botReply = { sender: "bot", text: response.data.reply || "I didn't understand that." };
            setTimeout(() => {
                setMessages((prev) => [...prev, botReply]); // Simulate response delay
            }, 300);
        } catch (error) {
            setTimeout(() => {
                setMessages((prev) => [...prev, { sender: "bot", text: "Error: Could not get response." }]);
            }, 300);
        }*/
    };

    useEffect(() => {
        chatboxRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div>
            <button className="chatbot-icon" onClick={toggleChat}>
                <img src="/chatbot.png" alt="Chatbot Icon" />
            </button>

            {isOpen && (
                <div className="chatbot-container">
                    <div className="chatbot-header">
                        <span>AI assistant</span>
                        <button onClick={toggleChat}>✖</button>
                    </div>

                    <div className="chat-container">
                        {messages.map((message, index) => (
                            <div key={index} className={message.sender === "user" ? "user-message" : "bot-message"}>
                                {message.text}
                            </div>
                        ))}
                        <div ref={chatboxRef} />
                    </div>

                    {/* Input Box and Send Button Together */}
                    <div className="chatbot-input">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            placeholder="Enter message..."
                        />
                        <button onClick={sendMessage}>➤</button>
                    </div>

                    <div className="chatbot-footer">Powered by Gemini✦</div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
