import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "./userContext";
import { APP_API_URL } from "../assets/config/API";
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItem] = useState([]);
  const { user } = useUser();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (user) {
      setUserId(user._id);
    }
  }, [user]);

  const addToCart = (product) => {
    setCartItem((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      } else {
        return [...prev, { ...product }];
      }
    });
  };

  const updateQuantity = (id, amount) => {
    setCartItem((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const removeCart = (id) => {
    setCartItem((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeCart, updateQuantity, setCartItem }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
