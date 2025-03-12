import React from 'react';
import { useNavigate } from 'react-router-dom';

const LearningHub: React.FC = () => {
    const navigate = useNavigate();

    const pages = [
        { icon: '📘', title: 'User Guide', description: 'Learn how to navigate the app', path: '/user-guide' },
        { icon: '🧠', title: 'Gamified Learning', description: 'Master tax concepts through interactive learning', path: '/page2' },
        { icon: '🏆', title: 'Tax Guide', description: 'Build practical tax skills with real-world examples', path: '/page3' },
    ];

    return (
        <div className="learning-hub-container">
            {pages.map((page) => (
                <div key={page.title} className="nav-box" onClick={() => navigate(page.path)}>
                    <span className="nav-box-icon">{page.icon}</span>
                    <div className="nav-box-content">
                        <span className="nav-box-title">{page.title}</span>
                        <br></br><br></br>
                        <span className="nav-box-description">{page.description}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LearningHub;
