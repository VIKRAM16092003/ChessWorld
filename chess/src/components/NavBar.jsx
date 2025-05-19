import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Your custom CSS

function NavBar({ isDarkMode, toggleDarkMode }) {
  return (
    <nav className={`navbar-container ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="navbar-brand">♟ ChessWorld</div>
      <ul className="navbar-links">
        <li><Link to="/">🏠 Home</Link></li>
        <li><Link to="/play">🎮 Play</Link></li>
        <li><Link to="/about">ℹ️ About</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;
