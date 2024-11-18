import React from 'react';
import './Welcome.css'; // Import welcome CSS file

const Welcome = () => {
  return (
    <div className="welcome">
      <h1>Welcome to Our Store!</h1>
      <p>Your one-stop shop for all your needs. Find the best deals on electronics, fashion, and more.</p>
      <button className="shop-now-btn">Shop Now</button>
    </div>
  );
}

export default Welcome;
