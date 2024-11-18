// src/SearchResultsPage.js
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './SearchResultsPage.css';

const products = [
  { id: 1, name: 'Product 1', price: '$10', image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Product 2', price: '$20', image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Product 3', price: '$30', image: 'https://via.placeholder.com/150' },
  { id: 4, name: 'Product 4', price: '$40', image: 'https://via.placeholder.com/150' },
  { id: 5, name: 'Product 5', price: '$50', image: 'https://via.placeholder.com/150' },
  // Add more products as needed
];

const SearchResultsPage = () => {
  const location = useLocation();
  const searchTerm = new URLSearchParams(location.search).get('q') || '';

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="search-results-container">
      <h2>Search Results for "{searchTerm}"</h2>

      {filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.name} className="product-image" />
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">{product.price}</p>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found for "{searchTerm}".</p>
      )}
    </div>
  );
};

export default SearchResultsPage;
