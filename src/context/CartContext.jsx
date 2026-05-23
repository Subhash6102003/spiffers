import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const localData = localStorage.getItem('spiffers_cart');
    return localData ? JSON.parse(localData) : [];
  });
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('spiffers_cart', JSON.stringify(cart));
  }, [cart]);

  const toggleCart = () => setCartOpen(prev => !prev);
  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);

  const addToCart = (product, qty = 1, size = null) => {
    setCart(prevCart => {
      // Find item with same ID and same size (if applicable)
      const existingIndex = prevCart.findIndex(
        item => item.id === product.id && item.size === size
      );

      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].qty += qty;
        return newCart;
      } else {
        return [
          ...prevCart,
          {
            id: product.id,
            title: product.title,
            handle: product.handle,
            price: product.price,
            image: product.images[0] || '/logo_icon.png',
            type: product.type,
            qty: qty,
            size: size
          }
        ];
      }
    });
  };

  const removeFromCart = (id, size = null) => {
    setCart(prevCart => prevCart.filter(item => !(item.id === id && item.size === size)));
  };

  const updateQuantity = (id, size = null, qty) => {
    if (qty <= 0) {
      removeFromCart(id, size);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id && item.size === size ? { ...item, qty } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((acc, item) => acc + item.qty, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartOpen,
        toggleCart,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartSubtotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
