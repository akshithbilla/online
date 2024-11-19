import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './SearchResultsPage.css';

const SearchResultsPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const searchTerm = new URLSearchParams(location.search).get('q') || '';

  // Fetch products from the JSON file
  useEffect(() => {
    setIsLoading(true);
    fetch('/products.json') // Assuming the JSON file is in the public folder
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError('Failed to load products. Please try again later.');
        console.error('Error fetching products:', error);
        setIsLoading(false);
      });
  }, []);

  // Filter products based on the search term
  const filteredProducts = products.filter((product) =>
    product.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="search-results-container">
      <h2>Search Results for "{searchTerm}"</h2>

      {isLoading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div key={product.ID} className="product-card">
              <Link to={`/product/${product.ID}`}>
                <img
                  src={product.Image}
                  alt={product.Name}
                  className="product-image"
                />
                <h3 className="product-name">{product.Name}</h3>
                <p className="product-price">₹{product.discounted_price}</p>
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
