import React from 'react';
import './Footer.css'; // Create a separate CSS file for the footer styles if needed

function Footer() {
  return (
    <footer className="App-footer" id="contact-us"> {/* Add an id for scroll functionality */}
      <div className="footer-content">
        <h2>Contact Us</h2>

        <div className="footer-inputs">
          <input type="text" placeholder="Phone Number" className="footer-input" />
          <input type="email" placeholder="Email Address" className="footer-input" />
          <input type="text" placeholder="Place" className="footer-input" />
        </div>

        <p>&copy; 2024 Your E-shop. All rights reserved.</p>
        <ul className="footer-links">
          <li><a href="/about">About Us</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/privacy">Privacy Policy</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
