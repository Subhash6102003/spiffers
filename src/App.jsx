import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';

export default function App() {
  return (
    <Router>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          {/* Global Site Navigation Header */}
          <Header />

          {/* Page Routing */}
          <main className="flex-grow bg-white">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:handle" element={<ProductDetail />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>

          {/* E-commerce Cart Slide Drawer */}
          <CartDrawer />

          {/* Global Footer */}
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}
