import axios from "axios";
const VITE_AUTH_SERVICE = import.meta.env.VITE_AUTH_SERVICE;

const authApi = axios.create({
  baseURL: `${VITE_AUTH_SERVICE}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const register = async (userData) => {
  const response = await authApi.post("/register", userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await authApi.post("/login", credentials);
  return response.data;
};

export const getCurrentUser = async (token) => {
  const response = await authApi.get("/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export default authApi;