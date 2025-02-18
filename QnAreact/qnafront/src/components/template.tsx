import { useState, useEffect, useRef } from 'react';
import '../styles/template.css';
import { Link } from 'react-router-dom';

//import logo
import logo from '../assets/logo.png';

// Import menu icon
import notificationIcon from '../assets/notification.png';
import profileIcon from '../assets/profile.png';
import menuIcon from '../assets/menu-icon.png';
import dashboardIcon from '../assets/sidebar/home.png';
import calculatorIcon from '../assets/sidebar/calculator.png';
import newsIcon from '../assets/sidebar/news.png';
import learningIcon from '../assets/sidebar/learning.png';
import qaIcon from '../assets/sidebar/qa.png';

interface LinkType {
  href: string;
  text: string;
}

interface SidebarItemType {
  href: string;
  text: string;
  icon: string; // Changed to string type
}

interface NavbarProps {
  links: LinkType[];
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ links, toggleSidebar }) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    if (isProfileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

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
                        <img src="src/assets/members/developer01.jpg" alt="Profile" /><br /> {/* Make sure path is correct */}
                        <span className="full-name">John Doe</span><br />
                        <span className="nic-no">NIC: 123456789</span>
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
  );
};


interface SidebarProps {
  isCollapsed: boolean;
  menuItems: SidebarItemType[];
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, menuItems }) => {
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
  );
};


interface TemplateProps {
  children: React.ReactNode;
  navTitle?: string;
  navLinks?: LinkType[];
  sidebarItems?: SidebarItemType[];
}

const Template: React.FC<TemplateProps> = ({
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
    { href: "/dashboard", text: "Dashboard", icon: dashboardIcon.toString() }, // Convert icon to string
    { href: "#taxcalculator", text: "Tax Calculator", icon: calculatorIcon.toString() }, // Convert icon to string
    { href: "#newsfeed", text: "News Feed", icon: newsIcon.toString() }, // Convert icon to string
    { href: "#learninghub", text: "Learning Hub", icon: learningIcon.toString() }, // Convert icon to string
    { href: "#qa-section", text: "Q & A Section", icon: qaIcon.toString() }  // Convert icon to string
  ]
}) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="app-container">
      <Navbar links={navLinks} toggleSidebar={toggleSidebar} />
      <Sidebar isCollapsed={isSidebarCollapsed} menuItems={sidebarItems} />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};


export default Template;