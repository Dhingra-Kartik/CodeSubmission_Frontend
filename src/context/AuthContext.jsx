import { createContext, useEffect, useState } from "react";
import { getCurrentUser } from "../services/authApi";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem("token");

        if (!storedToken) {
          setLoading(false);
          return;
        }

        const response = await getCurrentUser(storedToken);

        setUser(response.user);
        setToken(storedToken);
      } catch (err) {
        console.error(err);

        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const loginUser = (token, user) => {
    localStorage.setItem("token", token);

    setToken(token);
    setUser(user);
  };

  const logoutUser = () => {
    localStorage.removeItem("token");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}