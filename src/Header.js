import React from 'react';
import './App.css';

const Header = () => {
  return (
    <>
      <header className="App-header">
        <h1>Welcome to Our E-shop</h1>
        <p>Experience hassle-free shopping with us!</p>
        <button className="signup-button">Sign Up</button>
      </header>

      <main className="App-content">
        <section className="about-us" id="about-us">
          <div className="about-text">
            <h2>About Us</h2>
            <p>
              We offer a wide variety of products to cater to all your needs, ensuring a seamless online shopping experience.
            </p>
          </div>
          <div className="about-image">
            <img 
              src="https://blog.hubspot.com/hs-fs/hubfs/ecommerce%20marketing.jpg?width=595&height=400&name=ecommerce%20marketing.jpg" 
              alt="Online shopping"
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default Header;
