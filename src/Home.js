import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [groupedRecommendations, setGroupedRecommendations] = useState({});
  const [error, setError] = useState(null); // State to track any errors
  const [searchTerm, setSearchTerm] = useState(''); // State to track the search term
  const navigate = useNavigate();

  // Fetch recommendations from the JSON or API
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        console.log("Fetching recommendations...");
        const response = await fetch('/products.json'); // Replace with your API endpoint if necessary
        console.log("Response received:", response);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data fetched successfully:", data);

        // Filter products to include only those with a rating of 4 or 5
        const filteredData = data.filter((product) => product.Rating >= 4);
        console.log("Filtered data (4 and 5 star ratings):", filteredData);

        // Group products by rating in descending order
        const grouped = filteredData.reduce((acc, product) => {
          const rating = product.Rating || 0; // Default rating to 0 if not available
          if (!acc[rating]) {
            acc[rating] = [];
          }
          acc[rating].push(product);
          return acc;
        }, {});

        // Convert grouped object into sorted array by rating
        const sortedGrouped = Object.keys(grouped)
          .sort((a, b) => b - a) // Sort ratings in descending order
          .reduce((sortedAcc, rating) => {
            sortedAcc[rating] = grouped[rating];
            return sortedAcc;
          }, {});

        console.log("Data grouped and sorted by rating:", sortedGrouped);
        setGroupedRecommendations(sortedGrouped);
      } catch (err) {
        console.error("Error fetching or processing recommendations:", err);
        setError(err.message);
      }
    };

    fetchRecommendations();
  }, []);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle search submit
  const handleSearchSubmit = () => {
    // Navigate to SearchResultsPage with search term as a query parameter
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div className="home-container">
      <h1>Recommended Products</h1>

      {/* Search Bar */}
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
        <p className="error-message">Error: {error}</p>
      ) : Object.keys(groupedRecommendations).length > 0 ? (
        <div>
          {Object.keys(groupedRecommendations).map((rating) => (
            <div key={rating} className="rating-group">
              <h2>Rating: {rating}</h2>
              <div className="product-grid">
                {groupedRecommendations[rating]
                  .filter((product) =>
                    product.Name.toLowerCase().includes(searchTerm.toLowerCase())
                  ) // Filter products based on the search term
                  .map((product) => (
                    <div key={product.ID} className="product-card">
                      <Link to={`/product/${product.ID}`}>
                        <img
                          src={product.Image}
                          alt={product.Name}
                          className="product-image"
                        />
                        <h3 className="product-name">{product.Name}</h3>
                        <p className="product-description">{product.Description}</p>
                        <p className="product-price">₹{product.discounted_price}</p>
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: '#333', fontSize: '1.2rem', textAlign: 'center', marginTop: '20px' }}>
  Loading recommendations...
</p>

      )}
    </div>
  );
};

export default Home;
