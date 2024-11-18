import React from 'react';
import { Link } from 'react-router-dom';  
import './Navbar.css';

const Navbar = () => {
  const shoppingCartIconUrl = 'https://www.kindpng.com/picc/m/465-4654006_e-commerce-icon-illustration-hd-png-download.png';

  return (
    <nav className="navbar">
      <div className="navbar-title">
        <img src={shoppingCartIconUrl} alt="Shopping Cart" className="navbar-icon" />
        <b>E-shop</b>
      </div>
      <ul className="navbar-list">
        <li className="navbar-item"><a href="/home" className="navbar-link"><b>Shop Now</b></a></li>
        <li className="navbar-item"><Link to="/login" className="navbar-link"><b>Log in</b></Link></li>
        <li className="navbar-item"><a href="#about-us" className="navbar-link"><b>About us</b></a></li> 
        <li className="navbar-item"><a href="#contact-us" className="navbar-link"><b>Contact us</b></a></li>
      </ul>
    </nav>
  );
};

export default Navbar;






