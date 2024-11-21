// ProductRecommendations.js

import React, { useEffect, useState } from 'react';
import { fetchRecommendations } from './api';

const ProductRecommendations = ({ userId, searchHistory, productId }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRecommendations = async () => {
      const payload = { user_id: userId, search_history: searchHistory, product_id: productId };
      const data = await fetchRecommendations(payload);

      if (data.length === 0) {
        setError('No recommendations found.');
      }

      setRecommendations(data);
    };

    getRecommendations();
  }, [userId, searchHistory, productId]); // Re-fetch when any of these props change

  return (
    <div className="recommendations">
      <h2>Recommended Products</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {recommendations.map((product) => (
          <li key={product.product_id}>
            <h3>{product.product_name}</h3>
            <p>Similarity Score: {product.similarity_score}</p>
            {/* Optional: Display image if available */}
            <img src={product.product_image || 'https://via.placeholder.com/150'} alt={product.product_name} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductRecommendations;
