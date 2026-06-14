import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

function getInitialUser() {
  const storedUser = localStorage.getItem("sportssphere_user");

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch (error) {
    localStorage.removeItem("sportssphere_user");
    return null;
  }
}

function getInitialToken() {
  return localStorage.getItem("sportssphere_token");
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getInitialUser);
  const [token, setToken] = useState(getInitialToken);

  function login(userData, userToken) {
    localStorage.setItem("sportssphere_user", JSON.stringify(userData));
    localStorage.setItem("sportssphere_token", userToken);

    setUser(userData);
    setToken(userToken);
  }

  function logout() {
    localStorage.removeItem("sportssphere_user");
    localStorage.removeItem("sportssphere_token");

    setUser(null);
    setToken(null);
  }

  const value = {
    user,
    token,
    isLoggedIn: Boolean(token),
    isAdmin: user?.role === "admin",
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}