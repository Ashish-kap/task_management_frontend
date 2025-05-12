import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "@/stores/authStore";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(async (config) => {
  const { token } = useAuthStore.getState();

  if (token) {
    const decoded = jwtDecode(token);
    if (decoded.exp! * 1000 < Date.now()) {
      useAuthStore.getState().logout();
      window.location.href = "/login";
      return config;
    }
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
