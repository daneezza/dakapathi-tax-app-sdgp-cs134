import React from 'react';
import './Sidebar.css';

const Sidebar: React.FC = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-item">
                <i className="sidebar-icon">🏠</i>
            </div>
            <div className="sidebar-item">
                <i className="sidebar-icon">📚</i>
            </div>
            <div className="sidebar-item">
                <i className="sidebar-icon">🔄</i>
            </div>
            <div className="sidebar-item">
                <i className="sidebar-icon">💬</i>
            </div>
            <div className="sidebar-item">
                <i className="sidebar-icon">📊</i>
            </div>
            <div className="sidebar-item">
                <i className="sidebar-icon">🔔</i>
            </div>
            <div className="sidebar-item">
                <i className="sidebar-icon">🎨</i>
            </div>
            <div className="sidebar-item">
                <i className="sidebar-icon">💬</i>
            </div>
            <div className="sidebar-item">
                <i className="sidebar-icon">⚙️</i>
            </div>
        </div>
    );
};

export default Sidebar;