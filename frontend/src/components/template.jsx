import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import '../styles/template.css';
import Chatbot from '../components/Chatbot.tsx';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// Import logo and icons
import logo from '../assets/logo.png';
import notificationIcon from '../assets/notification.png';
import profileIcon from '../assets/profile.png';
import menuIcon from '../assets/menu-icon.png';
import dashboardIcon from '../assets/sidebar/home.png';
import calculatorIcon from '../assets/sidebar/calculator.png';
import newsIcon from '../assets/sidebar/news.png';
import learningIcon from '../assets/sidebar/learning.png';
import qaIcon from '../assets/sidebar/qa.png';

function Navbar({ links, toggleSidebar }) {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState({ fullname: "", nic: "" });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    } else {
      navigate('/'); // Redirect to login page if no user found in local storage
    }
  }, [navigate]);

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    if (isProfileDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileDropdownOpen]);

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data
    navigate('/'); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <li>
          <button onClick={toggleSidebar} className="menu-button">
            <img src={menuIcon} alt="Menu" className="nav-icon" />
          </button>
        </li>
        <div className="nav-brand">
          <img src={logo} alt="Logo" className="logo" />
        </div>
      </div>

      <ul className="nav-links">
        {links.map((link, index) => (
          <li key={index}>
            {link.href === "#notifications" ? (
              <img src={notificationIcon} alt="Notifications" className="nav-icon" />
            ) : link.href === "/profile" ? (
              <div className="profile-container" ref={dropdownRef}>
                <button onClick={toggleProfileDropdown} className="profile-button">
                  <img src={profileIcon} alt="Profile" className="nav-icon" />
                </button>

                {isProfileDropdownOpen && (
                  <div className="dropdown-popup">
                    <div className="profile-info">
                      <img src="src/assets/members/developer01.jpg" alt="Profile" />
                      <br />
                      <span className="full-name">{userData.fullname || "Error Displaying Name"}</span>
                      <br />
                      <span className="nic-no">NIC: {userData.nic || "Update NIC in Settings"}</span>
                    </div>
                    <a href="/settings">Settings</a>
                    <a onClick={handleLogout} className="logout-button">
                      Logout
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to={link.href}
                className={location.pathname === link.href ? "selected" : ""}
              >
                {link.text}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

Navbar.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    })
  ).isRequired,
  toggleSidebar: PropTypes.func.isRequired
};

const learningHubPages = ['/learning-hub', '/user-guide', '/gamefied', '/tax-guide'];

function Sidebar({ isCollapsed, menuItems }) {
  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-content">
        <div className="sidebar-menu">
          {menuItems.map((item, index) => (
            <div key={index}>
              <Link 
                to={item.href}
                className={
                  item.href === '/learning-hub' && learningHubPages.includes(location.pathname)
                    ? 'selected'
                    : location.pathname === item.href
                      ? 'selected'
                      : ''
                }
              >
                <div className="icon-container">
                  <img src={item.icon} alt={item.text} className="icon" />
                </div>
                {!isCollapsed && <span className="text">{item.text}</span>}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired
    })
  ).isRequired
};

function Template({
  children,
  navTitle = "",
  navLinks = [
    { href: "/about", text: "About Us" },
    { href: "/pricing", text: "Pricing" },
    { href: "/faq", text: "FAQ" },
    { href: "#notifications", text: "" },
    { href: "/profile", text: "" }
  ],
  sidebarItems = [
    { href: "/dashboard", text: "Dashboard", icon: dashboardIcon },
    { href: "/tax-cal", text: "Tax Calculator", icon: calculatorIcon },
    { href: "/news-feed", text: "News Feed", icon: newsIcon },
    { href: "/learning-hub", text: "Learning Hub", icon: learningIcon },
    { href: "/qna", text: "Q & A Section", icon: qaIcon }
  ]
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="app-container">
      <Navbar title={navTitle} links={navLinks} toggleSidebar={toggleSidebar} />
      <Sidebar isCollapsed={isSidebarCollapsed} menuItems={sidebarItems} />
      <Chatbot />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

Template.propTypes = {
  children: PropTypes.node.isRequired,
  navTitle: PropTypes.string,
  navLinks: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    })
  ),
  sidebarItems: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired
    })
  )
};

export default Template;