import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { SERVER_URL } from "../Config/Baseurl";

const getRefreshTokenFromCookie = () => {
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

const useaxios = () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = getRefreshTokenFromCookie();

  const axiosInstance = axios.create({
    SERVER_URL,
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    const decoded = jwtDecode(accessToken);
    const isExpired = decoded.exp * 1000 < Date.now();
    if (!isExpired) return req;
    const response = await axios.post(`${SERVER_URL}/auth/getaccesstoken`, {
      refreshToken: refreshToken,
    });
    localStorage.setItem("accessToken", response.accessToken);
    req.headers.Authorization = `Bearer ${response.accessToken}`;
    return req;
  });

  return axiosInstance;
};

export default useaxios;
