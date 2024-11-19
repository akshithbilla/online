// src/ProductPage.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductPage.css';

const products = [
  { id: 1, name: 'Product 1', price: '$10', rating: 4.5, image: 'https://via.placeholder.com/300' },
  { id: 2, name: 'Product 2', price: '$20', rating: 4.0, image: 'https://via.placeholder.com/300' },
  { id: 3, name: 'Product 3', price: '$30', rating: 4.2, image: 'https://via.placeholder.com/300' },
  { id: 4, name: 'Product 4', price: '$40', rating: 3.8, image: 'https://via.placeholder.com/300' },
   
  // Add more products as needed
];

const ProductPage = () => {
  const { id } = useParams();  // Get the product ID from the URL
  const navigate = useNavigate();

  // Find the product by ID
  const product = products.find((product) => product.id === parseInt(id));

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="product-page">
      <button onClick={() => navigate(-1)}>Back to Home</button>
      <img src={product.image} alt={product.name} className="product-image" />
      <h1>{product.name}</h1>
      <p className="product-price">{product.price}</p>
      <p className="product-rating">Rating: {product.rating} / 5</p>
    </div>
  );
};

export default ProductPage;
