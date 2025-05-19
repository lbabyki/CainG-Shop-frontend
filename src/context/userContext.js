import React, { createContext, useState, useContext } from "react";
import { APP_API_URL } from "../assets/config/API";
import axios from "axios";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData, token) => {
    localStorage.setItem("token", token);
    setUser(userData);
  };
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };
  const createUser = async (userData) => {
    console.log(userData);
    try {
      let response;
      if (user) {
        response = await axios.put(
          `${APP_API_URL}/api/users/${user._id}`,
          userData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUser(response.data);
      } else {
        response = await axios.post(
          `${APP_API_URL}/api/users/register`,
          userData
        );
      }
      return response.data;
    } catch (error) {
      console.error(
        "Lỗi tạo tài khoản:",
        error.response?.data || error.message
      );
      return null;
    }
  };
  return (
    <UserContext.Provider value={{ user, login, logout, createUser }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => useContext(UserContext);
