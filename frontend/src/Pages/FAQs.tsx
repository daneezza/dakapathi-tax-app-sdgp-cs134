import React from 'react';

import FAQList from "../components/faq/FAQList";
import "../styles/faq.css";

const FAQs: React.FC = () => {
  return (
    <div className="faq-container">
      <FAQList />
    </div>
  );
};

export default FAQs;
