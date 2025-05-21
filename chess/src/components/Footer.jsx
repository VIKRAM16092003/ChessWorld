import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="border-top border-dark shadow-sm">
    <footer className='bg-indigo-100' style={styles.footerLight}>
      <ul style={styles.list}>
        <li><Link to="/about" style={styles.link}>About</Link></li>
        <li><Link to="/contact" style={styles.link}>Contact</Link></li>
        <li><Link to="/blog" style={styles.link}>Blog</Link></li>
        <li><Link to="/terms" style={styles.link}>Terms</Link></li>
        <li><Link to="/privacy" style={styles.link}>Privacy</Link></li>
      </ul>
    </footer>
    </div>
  );
};

const styles = {
  footerLight: {
    
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
};

export default Footer;
