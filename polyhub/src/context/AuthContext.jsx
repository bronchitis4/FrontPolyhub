import React, { createContext, useState, useEffect } from "react";
import AuthService from "../services/authService.js";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const authService = new AuthService();

  const checkAuth = async () => {
    try {
      const userData = await authService.checkAuth();
      setRole(userData?.role || null);
    } catch (error) {
      setRole(null);
      console.error("Auth check failed:", error);
    }
  };

  const login = (userRole) => {
    setRole(userRole);
  };

  const logout = () => {
    setRole(null);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ role, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
