import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "./cartContext";
import { useUser } from "./userContext";
import { APP_API_URL } from "../assets/config/API";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orderItems, setOrderItem] = useState([]);
  const { cartItems } = useCart();
  const { user, login } = useUser();

  useEffect(() => {
    async function fetchOrders() {
      if (!user?._id) return; // Đợi có user mới gọi
      try {
        const res = await axios.get(
          `${APP_API_URL}/api/orders/user/${user._id}`
        );
        setOrderItem(res.data); // đúng biến lưu state
      } catch (err) {
        console.error("❌ Lỗi khi fetch đơn hàng:", err);
      }
    }

    fetchOrders();
  }, [user]);

  const CreateOrder = async ({
    email,
    phone,
    paymentMethod,
    deliveryAddress,
    fullName,
  }) => {
    try {
      let currentUser = user;

      // 1. Nếu chưa đăng nhập thì tạo tài khoản và login
      if (!currentUser) {
        await axios.post(`${APP_API_URL}/api/users/register`, {
          username: fullName || email.split("@")[0],
          email,
          password: "123456",
          phone,
        });

        const loginRes = await axios.post(`${APP_API_URL}/api/users/login`, {
          email,
          password: "123456",
        });

        currentUser = loginRes.data.user;
        let token = loginRes.data.token;
        login(currentUser, token);
      }

      // 2. Sau khi có user → tạo đơn hàng
      const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      const newOrder = {
        userId: currentUser._id,
        email,
        phone,
        paymentMethod,
        deliveryAddress,
        items: cartItems.map((item) => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          imageUrl: item.imageUrl,
        })),
        total,
        status: "Processing",
      };

      const orderRes = await axios.post(`${APP_API_URL}/api/orders`, newOrder);

      const savedOrder = orderRes.data;
      setOrderItem((prev) => [...prev, savedOrder]);
      return savedOrder._id;
    } catch (error) {
      console.error(
        "❌ Lỗi khi xử lý đơn hàng. Hãy đảm bảo rằng bạn đã đăng nhập:",
        error.message
      );
      return null;
    }
  };

  return (
    <OrderContext.Provider value={{ orderItems, CreateOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrder = () => useContext(OrderContext);
