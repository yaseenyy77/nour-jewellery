import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('nour_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load wishlist:', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('nour_wishlist', JSON.stringify(favorites));
    } catch (e) {
      console.error('Failed to save wishlist:', e);
    }
  }, [favorites]);

  const addToWishlist = (product) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => String(item.id) === String(product.id));
      if (exists) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setFavorites((prev) => prev.filter((item) => String(item.id) !== String(productId)));
  };

  const clearWishlist = () => {
    setFavorites([]);
  };

  return (
    <WishlistContext.Provider value={{ favorites, addToWishlist, removeFromWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};