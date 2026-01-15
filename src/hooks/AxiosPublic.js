import axios from "axios";
import { getAuth } from "firebase/auth";

const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosPublic.interceptors.request.use(async (config) => {
    const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosPublic;
