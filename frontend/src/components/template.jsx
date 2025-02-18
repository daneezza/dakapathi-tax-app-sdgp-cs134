import PropTypes from 'prop-types'
import { useState, useEffect, useRef } from 'react'
import '../styles/template.css'
import Chatbot from '../components/Chatbot.tsx'
import { Link } from 'react-router-dom'

//import logo
import logo from '../assets/logo.png'

// Import menu icon
import notificationIcon from '../assets/notification.png'
import profileIcon from '../assets/profile.png'
import menuIcon from '../assets/menu-icon.png' 
import dashboardIcon from '../assets/sidebar/home.png'
import calculatorIcon from '../assets/sidebar/calculator.png'
import newsIcon from '../assets/sidebar/news.png'
import learningIcon from '../assets/sidebar/learning.png'
import qaIcon from '../assets/sidebar/qa.png'


function Navbar({ links, toggleSidebar }) {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  // Add useEffect to handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    // Add event listener when dropdown is open
    if (isProfileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileDropdownOpen]);

  return (
    <nav className="navbar">
      <li>
        <button onClick={toggleSidebar} className="menu-button">
          <img src={menuIcon} alt="Menu" className="nav-icon" />
        </button>
      </li>
      <div className="nav-brand">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <ul className="nav-links">
        {links.map((link, index) => (
          <li key={index}>
            <Link to={link.href}>
              {link.href === "#notifications" && <img src={notificationIcon} alt="Notifications" className="nav-icon" />}
              {link.href === "#profile" && (
                <div className="profile-container">
                  <button onClick={toggleProfileDropdown} className="profile-button">
                    <img src={profileIcon} alt="Profile" className="nav-icon" />
                  </button>
                  {isProfileDropdownOpen && (
                    <div className="dropdown-popup" ref={dropdownRef}>
                      <div className="profile-info">
                        <div className="profile-info">
                          <img src="src/assets/members/developer01.jpg" alt="Profile" /><br></br>
                          <span className="full-name">John Doe</span><br></br>
                          <span className="nic-no">NIC: 123456789</span>
                        </div>
                      </div>
                      <a href="#settings">Settings</a>
                      <a href="#logout">Logout</a>
                    </div>
                  )}
                </div>
              )}
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

Navbar.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    })
  ).isRequired,
  toggleSidebar: PropTypes.func.isRequired
}

function Sidebar({ isCollapsed, menuItems }) {
  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-content">
        <div className="sidebar-menu">
          {menuItems.map((item, index) => (
            <div key={index}>
              <Link to={item.href}>
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
  )
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
}

function Template({ 
  children,
  navTitle = "",
  navLinks = [
    { href: "/about", text: "About Us" },
    { href: "#pricing", text: "Pricing" },
    { href: "#faq", text: "FAQ" },
    { href: "#notifications", text: "" },
    { href: "#profile", text: "" }
  ],
  sidebarItems = [
    { href: "/dashboard", text: "Dashboard", icon: dashboardIcon },
    { href: "#taxcalculator", text: "Tax Calculator", icon: calculatorIcon },
    { href: "#newsfeed", text: "News Feed", icon: newsIcon },
    { href: "#learninghub", text: "Learning Hub", icon: learningIcon },
    { href: "#qa-section", text: "Q & A Section", icon: qaIcon }
  ]
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  return (
    <div className="app-container">
      <Navbar title={navTitle} links={navLinks} toggleSidebar={toggleSidebar} />
      <Sidebar isCollapsed={isSidebarCollapsed} menuItems={sidebarItems} />
      <Chatbot/>
      <main className="main-content">
          {children}
        </main>
    </div>
  )
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
}

export default Template;


