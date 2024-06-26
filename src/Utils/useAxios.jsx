import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { SERVER_URL } from "../Config/Baseurl";
import { useNavigate } from "react-router-dom";

export const getRefreshTokenFromCookie = () => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith("refreshToken=")) {
      const refreshToken = cookie.substring("refreshToken=".length);
      return refreshToken;
    }
  }
  return null;
};

const useAxios = () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = getRefreshTokenFromCookie();
  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: SERVER_URL,
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
  });

  axiosInstance.interceptors.request.use(async (req) => {
    try {
      // Check if there is an access token
      if (!accessToken || !refreshToken) {
        throw new Error("No Token Found");
      }

      const decoded = jwtDecode(accessToken);

      const isExpired = decoded.exp * 1000 < Date.now();
      if (!isExpired) return req;

      const response = await axios.post(`${SERVER_URL}/auth/getaccesstoken`, {
        refreshToken: refreshToken,
      });

      localStorage.setItem("accessToken", response.data.accessToken);
      req.headers.Authorization = `Bearer ${response.data.accessToken}`;
      return req;
    } catch (err) {
      console.log(err);
      navigate("/login");

      // Cancel the request to prevent it from being sent
      return Promise.reject(err);
    }
  });

  return axiosInstance;
};

export default useAxios;
