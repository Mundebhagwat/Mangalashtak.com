// src/components/PageTemplate.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/PageTemplate.css';

const PageTemplate = ({ title, children }) => {
  return (
    <div className="page-container">
      <header className="page-header">
        <div className="header-content">
          <Link to="/" className="logo">Mangalashtak</Link>
          <h1>{title}</h1>
        </div>
      </header>
      
      <main className="page-content">
        {children}
      </main>
      
      <footer className="page-footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} Mangalashtak. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/success-stories">Success Stories</Link>
            <Link to="/faq">FAQ</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PageTemplate;