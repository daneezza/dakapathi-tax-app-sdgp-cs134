import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../styles/Chatbot.css";

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false); // State for typing indicator
    const chatboxRef = useRef<HTMLDivElement>(null);

    const toggleChat = () => setIsOpen((prev) => !prev);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: "user", text: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsTyping(true); // Show typing indicator

        try {
            const response = await axios.post("http://localhost:3000/chat", { message: input });
            const botReply = response.data.reply || "I didn't understand that.";

            setTimeout(() => {
                setIsTyping(false); // Hide typing indicator
                setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
            }, 1000); // Simulate delay
        } catch (error) {
            setTimeout(() => {
                setIsTyping(false); // Hide typing indicator
                setMessages((prev) => [...prev, { sender: "bot", text: "Error: Could not get response." }]);
            }, 1000);
        }
    };

    useEffect(() => {
        chatboxRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    return (
        <div>
            <button className="chatbot-icon" onClick={toggleChat}>
                <img src="/chatbot-icon.png" alt="Chatbot Icon" />
            </button>

            {isOpen && (
                <div className="chatbot-container">
                    <div className="chatbot-header">
                        <span className="header-topic">Tax Assistant</span>
                        <button onClick={toggleChat}>✖</button>
                    </div>

                    <div className="chat-container">
                        {messages.map((message, index) => (
                            <div key={index} className={message.sender === "user" ? "user-message" : "bot-message"}>
                                {message.text}
                            </div>
                        ))}
                        {isTyping && <div className="typing-indicator"><span></span><span></span><span></span></div>}
                        <div ref={chatboxRef} />
                    </div>

                    <div className="chatbot-input">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            placeholder="Got a tax question? Type it here!"
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
