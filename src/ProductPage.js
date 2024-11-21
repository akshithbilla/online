// ProductPage.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductRecommendations from './ProductRecommendations';

const ProductPage = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [userId, setUserId] = useState('123'); // Example user ID (can be dynamic)
  const searchHistory = ['Clothing', 'Lingerie']; // Example search history

  return (
    <div>
      <h1>Product Page</h1>
      <p>Viewing product: {id}</p> {/* Display the product ID */}
      <ProductRecommendations 
        userId={userId} 
        searchHistory={searchHistory} 
        productId={id}  // Pass dynamic productId
      />
    </div>
  );
};

export default ProductPage;
