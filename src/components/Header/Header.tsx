import React, { useEffect, useState } from 'react';
import { useTheme } from "../../services/providers/ThemeContext";
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faGears, faList, faBars, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import Switch from '../Switch/Switch';
import './Header.css';

const Header: React.FC = () => {
  const location = useLocation();
  const { darkMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // To toggle the dropdown

  const toggleDarkMode = () => {
    toggleTheme();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the dropdown menu
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640) {
        setIsMenuOpen(false); // Close the mobile menu if width is greater than 640px
      }
    };

    // Set up the event listener
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location])

  return (
    <nav className={`header-container ${darkMode ? 'dark navbar-dark' : 'navbar-light'}`}>
      {/* Hamburger Icon for Mobile */}
      <button className="menu-toggle" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} />
      </button>

      {/* Navigation Links */}
      <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <Link
          to="/"
          className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
        ><FontAwesomeIcon icon={faClock} className='icon' /> Timer</Link>

        <Link
          to="/settings"
          className={`nav-item ${location.pathname === '/settings' ? 'active' : ''}`}
        ><FontAwesomeIcon icon={faGears} className='icon' /> Settings</Link>

        <Link
          to="/todos"
          className={`nav-item ${location.pathname === '/todos' ? 'active' : ''}`}
        ><FontAwesomeIcon icon={faList} className='icon' /> Todos</Link>

        <Link
          to="/signin"
          className={`nav-item ${location.pathname === '/signin' ? 'active' : ''}`}
        ><FontAwesomeIcon icon={faDoorOpen} className='icon' /> Sign In</Link>
      </div>

      {/* Dark Mode Toggle */}
      <div className="theme-switcher">
        <Switch isChecked={darkMode} onChange={toggleDarkMode} showIcon={true} />
      </div>

      {/* Dropdown Menu for Mobile */}
      {isMenuOpen && (
        <div className={`mobile-menu ${darkMode ? 'dark navbar-dark' : 'navbar-light'}`}>
          <Link
            to="/"
            className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
          ><FontAwesomeIcon icon={faClock} className='icon' /> Timer</Link>

          <Link
            to="/settings"
            className={`nav-item ${location.pathname === '/settings' ? 'active' : ''}`}
          ><FontAwesomeIcon icon={faGears} className='icon' /> Settings</Link>

          <Link
            to="/todos"
            className={`nav-item ${location.pathname === '/todos' ? 'active' : ''}`}
          ><FontAwesomeIcon icon={faList} className='icon' /> Todos</Link>

          <Link
            to="/signin"
            className={`nav-item ${location.pathname === '/signin' ? 'active' : ''}`}
          ><FontAwesomeIcon icon={faDoorOpen} className='icon' /> Sign In</Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
