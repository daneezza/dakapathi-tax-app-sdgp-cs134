import React from 'react';
import FAQItem from "./FAQItem";

const faqData = [
  { question: "What is tax?", answer: "Tax is money that people and businesses must pay to the government. The government uses this money to build roads, hospitals, schools, and other important things for everyone." },  
  { question: "Why should I pay tax?", answer: "Paying tax helps your country grow. It is used to give free healthcare, education, and other benefits to you and your family. Without tax, the government cannot provide these services." },
  { question: "Do all people have to pay tax?", answer: "No, not everyone. Only people who earn more than a certain amount of money have to pay tax. If you earn a small amount, you may not have to pay." },
  { question: "What happens if I don’t pay tax?", answer: "If you don’t pay tax when you should, the government may fine you, take legal action, or even close your business. Paying taxes on time avoids trouble." },
  { question: "What are the different types of tax in Sri Lanka?", answer: "Sri Lanka has various taxes that help support the country's development. If you earn above a certain limit, you must pay income tax on your earnings. VAT (Value Added Tax) is a small percentage added to the price of goods and services you buy. Corporate tax applies to businesses, requiring them to pay a portion of their profits. Import duty is charged on goods brought into the country, and property tax is applied to land and houses owned by individuals." },
  { question: "How do I know if I need to pay income tax?", answer: "If your yearly income is more than Rs. 1,200,000 (as per the latest rules), you must pay income tax. If you are unsure, you can check with the tax department." },
  { question: "How do I pay my tax?", answer: "You can pay tax at a bank, through the Inland Revenue Department (IRD) website, or by visiting an IRD office." },
  { question: "What is VAT, and do I have to pay it?", answer: "VAT (Value Added Tax) is a tax added to the price of goods and services. When you buy something, the shop already includes VAT in the price, so you are paying it without noticing." },
  { question: "Can I get a tax refund?", answer: "If you paid more tax than required, the government might give you back the extra amount. This is called a refund. You need to apply for it." },
  { question: "Do small businesses have to pay tax?", answer: "Yes, but only if they earn more than the tax-free limit. Small businesses should check with the Inland Revenue Department to know their tax duty." },
  { question: "How does tax help me and my family?", answer: "Your tax money is used to provide free hospitals, schools, better roads, police, and public transport. It also helps the poor by giving them financial support." },
  { question: "What if I don’t understand tax rules?", answer: "You can visit the Inland Revenue Department or ask a tax officer for help. Many free services are available to explain tax rules to people." },

];

const FAQList = () => {
  return (
    <div className="faq-wrapper">
      <h1 className="faq-topic">Tax Hacks: Everything You Should Know</h1>
      <div className="faq-list">
        {faqData.map((faq, index) => (
          <FAQItem key={index} {...faq} />
        ))}
      </div>
    </div>
  );
};

export default FAQList;
