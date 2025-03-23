import axios from 'axios';
import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import '../styles/template.css';
import Chatbot from '../components/Chatbot.tsx';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Notification from '../components/auth/Notification.jsx';

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

function Navbar({ links, toggleSidebar, notification, setNotification }) {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState({ fullname: "", nic: "", profilePic: null });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserData(user);
      fetchProfileImage(user.email);
    } else {
      navigate('/'); // Redirect to login page if no user found in local storage
    }
  }, [navigate]);


  const fetchProfileImage = async (email) => {
    try {
      console.log('Fetching profile image for:', email); // Debugging log
      const response = await axios.get(`https://dakapathi-tax-app-sdgp-cs134.onrender.com/api/auth/getProfileImage?email=${email}`);

      if (response.status === 200 && response.data.profileImage) {
        console.log('Profile image fetched successfully');
        setUserData((prev) => ({ ...prev, profilePic: response.data.profileImage }));
      } else {
        console.error('Error fetching profile image:', response.data);
      }
    } catch (error) {
      console.error('Error fetching profile image:', error);
    }
  };


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
    setNotification({ message: 'Logged out successfully', variant: 'info' }); // Show notification
    setTimeout(() => {
        navigate('/'); 
      }, 1500); 
  };

  return (
    <nav className="navbar">
      {/* Display Notification */}
      {notification.message && (
        <Notification 
          message={notification.message}
          variant={notification.variant}
          onClose={() => setNotification({ message: '', variant: 'info' })}
        />
      )}

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
                  <img src={userData.profilePic || profileIcon}  alt="Profile" className="nav-icon" />
                </button>

                {isProfileDropdownOpen && (
                  <div className="dropdown-popup">
                    <div className="profile-info">
                      <img src={userData.profilePic || profileIcon} alt="Profile" />
                      <br />
                      <span className="full-name">{userData.fullname || "Error Displaying Name"}</span>
                      <br />
                      <span className="nic-no">NIC: {userData.nic || "Update NIC in Settings"}</span>
                    </div>
                    <Link to="/settings">Settings</Link>
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
  toggleSidebar: PropTypes.func.isRequired,
  notification: PropTypes.object.isRequired,
  setNotification: PropTypes.func.isRequired
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
  const [notification, setNotification] = useState({ message: '', variant: 'info' });

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="app-container">
      <Navbar title={navTitle} links={navLinks} toggleSidebar={toggleSidebar} notification={notification} setNotification={setNotification} />
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
