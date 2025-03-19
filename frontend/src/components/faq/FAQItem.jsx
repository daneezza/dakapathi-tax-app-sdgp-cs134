import React, { useState } from "react";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`faq-item ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
      <div className="faq-question">
        {question}
        <span className="arrow">{isOpen ? "×" : "+"}</span>
      </div>
      <div className="faq-answer">{answer}</div>
    </div>
  );
};

export default FAQItem;
