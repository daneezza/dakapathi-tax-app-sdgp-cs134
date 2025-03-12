import React from 'react';
import FAQItem from "./FAQItem";

const faqData = [
  { question: "What is income tax?", answer: " Income tax is a tax imposed by the government on individuals and businesses based on their earnings. The tax rate depends on income levels and applicable tax laws." },  
  { question: "How is my income tax calculated?", answer: "Your income tax is calculated based on your taxable income, which includes wages, bonuses, and other earnings. Deductions and tax credits may reduce your taxable income, leading to lower tax liability." },
  { question: "What happens if I don’t pay my taxes on time?", answer: "If you fail to pay your taxes on time, you may face penalties, interest charges, or even legal action. Some governments may also restrict services such as renewing licenses or passports." },
  { question: "What is a tax deduction?", answer: "A tax deduction is an expense that can be subtracted from your total taxable income, reducing the amount of tax you owe. Common deductions include education expenses, medical costs, and charitable donations." },
  { question: "What is the difference between tax deductions and tax credits?", answer: "A tax deduction reduces the amount of your taxable income, while a tax credit directly reduces the amount of tax you owe. Tax credits usually provide a greater benefit." },
  { question: "Who needs to file a tax return?", answer: "Any individual or business earning taxable income must file a tax return. The specific income threshold varies by country and jurisdiction." },
  { question: "What is a VAT (Value-Added Tax)?", answer: "VAT is a consumption tax applied to goods and services at each stage of production or distribution. Consumers ultimately bear the cost of VAT in the final purchase price." },
  { question: "Can I claim tax benefits for my business expenses?", answer: "Any individual or business earning taxable income must file a tax return. The specific income threshold varies by country and jurisdiction." },
];

const FAQList: React.FC = () => {
  return (
    <div className="faq-wrapper">
      <h1>Tax Hacks: Everything You Should Know</h1>
      <div className="faq-list">
        {faqData.map((faq, index) => (
          <FAQItem key={index} {...faq} />
        ))}
      </div>
    </div>
  );
};

export default FAQList;
