import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Footer from './Footer';
import HomePage from './HomePage';
import Login from './Login';
import Navbar from './Navbar';
import Header from './Header';
import ProductPage from './ProductPage';
import SearchResultsPage from './SearchResultsPage';
import ProductRecommendations from './ProductRecommendations';


function AppLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isProductPage = location.pathname.startsWith('/product');
  const isSearchPage = location.pathname === '/search';

  const isFreshPage = isLoginPage || isProductPage || isSearchPage;

  return (
    <div className="App">
      {/* Render Navbar and Header only if not on fresh pages */}
      {!isFreshPage && <Navbar />}
      {!isFreshPage && <Header />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/productshome" element={<Home />} />
        {/* Update ProductPage route to include productId as a dynamic parameter */}
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
      </Routes>

      {/* Render Footer only if not on fresh pages */}
      {!isFreshPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
