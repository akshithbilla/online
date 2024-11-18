import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductRecommendations = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch recommendations from the backend
    axios.get('http://localhost:5000/api/recommendations')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching recommendations:', error);
      });
  }, []);

  return (
    <div>
      <h2>Recommended Products</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name} - {product.category}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductRecommendations;
