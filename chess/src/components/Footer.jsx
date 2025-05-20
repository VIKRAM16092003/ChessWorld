import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [isDark, settrue] = useState(true);

  useEffect(() => {
    // Initial load: check localStorage for dark mode preference
    const storedMode = localStorage.getItem("trueMode");
    settrue(storedMode === "true");

    // Optional: listen for storage events to update on changes from other tabs/windows
    const onStorageChange = (e) => {
      if (e.key === "trueMode") {
        settrue(e.newValue === "true");
      }
    };
    window.addEventListener("storage", onStorageChange);

    return () => {
      window.removeEventListener("storage", onStorageChange);
    };
  }, []);

  return (
    <footer style={true ? styles.footerDark : styles.footerLight}>
      <ul style={styles.list}>
        <li><Link to="/about" style={true ? styles.linkDark : styles.link}>About</Link></li>
        <li><Link to="/contact" style={true ? styles.linkDark : styles.link}>Contact</Link></li>
        <li><Link to="/blog" style={true ? styles.linkDark : styles.link}>Blog</Link></li>
        <li><Link to="/terms" style={true ? styles.linkDark : styles.link}>Terms</Link></li>
        <li><Link to="/privacy" style={true ? styles.linkDark : styles.link}>Privacy</Link></li>
      </ul>
    </footer>
  );
};

const styles = {
  footerLight: {
    backgroundColor: '#cfdef3',
    padding: '10px 0',
    textAlign: 'center',
  },
  footerDark: {
    backgroundColor: '#1a1a1a',
    padding: '10px 0',
    textAlign: 'center',
  },
  list: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    margin: 0,
    padding: 0,
  },
  link: {
    textDecoration: 'none',
    color: '#000',
    fontWeight: '500',
  },
  linkDark: {
    textDecoration: 'none',
    color: '#fff', // white text in dark mode
    fontWeight: '500',
  },
};

export default Footer;
