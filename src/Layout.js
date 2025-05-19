import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartSide from "./components/Cart-side";
import { Outlet } from "react-router-dom";
import "./assets/css/layout.css";
import "./assets/css/reset.css";
import "./assets/css/common/main.css";
import { CartProvider } from "./context/cartContext";
import { OrderProvider } from "./context/orderContext";
export default function Layout() {
  const [openCart, setOpenCart] = useState(false);

  const handleToggle = () => {
    setOpenCart(!openCart);
  };

  return (
    <CartProvider>
      <OrderProvider>
        <div className="layout-container">
          <CartSide handleToggle={handleToggle} openCart={openCart} />
          <Navbar handleToggle={handleToggle} />
          <Outlet />
          <Footer />
        </div>
      </OrderProvider>
    </CartProvider>
  );
}
