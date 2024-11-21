import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [groupedRecommendations, setGroupedRecommendations] = useState({});
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/recommend', { // Flask endpoint
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ product_id: 'someProductID' })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // Assuming data is in the correct format
        const grouped = data.recommendations.reduce((acc, product) => {
          const rating = product.similarity_score || 0;
          if (!acc[rating]) {
            acc[rating] = [];
          }
          acc[rating].push(product);
          return acc;
        }, {});

        const sortedGrouped = Object.keys(grouped)
          .sort((a, b) => b - a)
          .reduce((sortedAcc, rating) => {
            sortedAcc[rating] = grouped[rating];
            return sortedAcc;
          }, {});

        setGroupedRecommendations(sortedGrouped);
      } catch (err) {
        setError("Failed to fetch recommendations.");
        console.error("Error fetching recommendations:", err);
      }
    };

    fetchRecommendations();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div className="home-container">
      <h1>Recommended Products</h1>

      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-bar"
      />
      <button onClick={handleSearchSubmit} className="search-button">
        Search
      </button>

      {error ? (
        <p className="error-message">{error}</p>
      ) : Object.keys(groupedRecommendations).length > 0 ? (
        <div>
          {Object.keys(groupedRecommendations).map((rating) => (
            <div key={rating} className="rating-group">
              <h2>Rating: {rating}</h2>
              <div className="product-grid">
                {groupedRecommendations[rating]
                  .filter((product) =>
                    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((product) => (
                    <div key={product.product_id} className="product-card">
                      <Link to={`/product/${product.product_id}`}>
                        <img
                          src={product.product_image}
                          alt={product.product_name}
                          className="product-image"
                        />
                        <h3 className="product-name">{product.product_name}</h3>
                        <p className="product-description">{product.product_description}</p>
                        <p className="product-price">₹{product.product_discounted_price}</p>
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading recommendations...</p>
      )}
    </div>
  );
};

export default Home;
