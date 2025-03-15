import { useState } from 'react';
import '../styles/Dashboard.css';

function Dashboard() {
    // Track which card is currently flipped
    const [flippedCard, setFlippedCard] = useState(null);

    // Content for each section - shortened to fit without scrolling
    const cardContent = {
        taxCalculator: {
            title: "Tax Calculator",
            image: "src/assets/images/cal.png",
            content: (
                <>
                    <h3>Tax Calculator</h3>
                    <p>Calculate your income tax based on your earnings using the latest tax rates and regulations.</p>
                </>
            )
        },
        aiChatbot: {
            title: "AI Chatbot",
            image: "src/assets/images/ai.png",
            content: (
                <>
                    <h3>AI Chatbot</h3>
                    <p>Ask tax related questions, including rules and regulations and updated tax ratios.</p>
                </>
            )
        },
        taxGuide: {
            title: "Tax - Guide",
            image: "src/assets/images/guide.png",
            content: (
                <>
                    <h3>Tax Guide</h3>
                    <p>Informative video tutorials to watch and learn about taxes at own pace.</p>
                </>
            )
        },
        gameLearn: {
            title: "Gamified Learning",
            image: "src/assets/images/game.png",
            content: (
                <>
                    <h3>Gamified Learning</h3>
                    <p>Learn about taxes through interactive games and track your understanding of tax concepts.</p>
                </>
            )
        },
        newsFeed: {
            title: "News Feed",
            image: "src/assets/images/news.png",
            content: (
                <>
                    <h3>News Feed</h3>
                    <p>Stay updated with the latest tax news, policy changes, and regulatory updates.</p>
                </>
            )
        },
        qAndA: {
            title: "Q & A",
            image: "src/assets/images/qna.png",
            content: (
                <>
                    <h3>Q & A</h3>
                    <p>Browse through common tax-related questions and get expert answers to your queries.</p>
                </>
            )
        },
        faq: {
            title: "FAQ",
            image: "src/assets/images/faq.png",
            content: (
                <>
                    <h3>FAQ</h3>
                    <p>Find quick answers to common tax inquiries, filing deadlines, and document requirements.</p>
                </>
            )
        }
    };

    // Handle card click to flip
    const handleCardClick = (cardId) => {
        if (flippedCard === cardId) {
            // If clicking on already flipped card, flip it back
            setFlippedCard(null);
        } else {
            // Otherwise flip to the new card
            setFlippedCard(cardId);
        }
    };

    // Create a card component
    const FlippableCard = ({ id, card }) => (
        <div
            className={`flippable-card ${flippedCard === id ? 'flipped' : ''}`}
            onClick={() => handleCardClick(id)}
        >
            <div className="card-inner">
                <div className="card-front">
                    <img src={card.image} alt={card.title} />
                    <span>{card.title}</span>
                </div>
                <div className="card-back">
                    <div className="intro-container">
                        {card.content}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="dashboard">
            <h1 className="dashboard-title">! Welcome to Dakapathi !</h1>
            <p className="dashboard-aim"><i>"Bringing tax awareness and transparency to build a more informed and responsible society."</i></p>
            
            <div className="quick-actions">
                <h2 className="section-title">Quick Actions</h2>
                <div className="quick-actions-container">
                    <FlippableCard id="taxCalculator" card={cardContent.taxCalculator} />
                    <FlippableCard id="aiChatbot" card={cardContent.aiChatbot} />
                    <FlippableCard id="taxGuide" card={cardContent.taxGuide} />
                    <FlippableCard id="gameLearn" card={cardContent.gameLearn} />
                </div>
                <div className="quick-actions-container">
                    <FlippableCard id="newsFeed" card={cardContent.newsFeed} />
                    <FlippableCard id="qAndA" card={cardContent.qAndA} />
                    <FlippableCard id="faq" card={cardContent.faq} />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;