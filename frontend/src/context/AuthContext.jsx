import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../services/api.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("exploreVizagUser");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem("exploreVizagUser", JSON.stringify(user));
    else localStorage.removeItem("exploreVizagUser");
  }, [user]);

  const login = async (payload) => {
    const { data } = await api.post("/auth/login", payload);
    setUser(data);
    return data;
  };

  const register = async (payload) => {
    const { data } = await api.post("/auth/register", payload);
    setUser(data);
    return data;
  };

  const logout = () => setUser(null);

  const refreshMe = async () => {
    const { data } = await api.get("/auth/me");
    setUser((current) => ({ ...current, ...data, token: current?.token }));
    return data;
  };

  const value = useMemo(
    () => ({ user, isAuthenticated: Boolean(user), isAdmin: user?.role === "admin", login, register, logout, refreshMe, setUser }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
