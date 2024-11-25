import axios from "axios";
import { authInterceptor } from "@/api/axios/interceptors/authInterceptor";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

apiClient.interceptors.request.use(authInterceptor, (error) => Promise.reject(error));

export default apiClient;
