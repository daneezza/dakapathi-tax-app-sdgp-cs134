import React from 'react';
import './Header.css';

const Header: React.FC = () => {
    return (
        <div className="header">
            <div className="logo">දැකපු</div>
            <div className="search-bar">
                <input type="text" placeholder="Search..." />
            </div>
            <div className="user-profile">
                <span className="username">James Anderson</span>
                <div className="avatar-circle"></div>
            </div>
        </div>
    );
};

export default Header;