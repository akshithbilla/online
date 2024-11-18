// src/Home.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

const products = [
  { id: 1, name: 'Product 1', price: '$10', image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Product 2', price: '$20', image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Product 3', price: '$30', image: 'https://via.placeholder.com/150' },
  { id: 4, name: 'Product 4', price: '$40', image: 'https://via.placeholder.com/150' },
  { id: 5, name: 'Product 5', price: '$50', image: 'https://via.placeholder.com/150' },
  // Add more products as needed
];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    // Navigate to SearchResultsPage with search term as a query parameter
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div className="home-container">
      <h1>Welcome to Shoppy</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-bar"
      />
      <button onClick={handleSearchSubmit} className="search-button">Search</button>

      {/* Display All Products */}
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`}>
              <img src={product.image} alt={product.name} className="product-image" />
              <h2 className="product-name">{product.name}</h2>
              <p className="product-price">{product.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
