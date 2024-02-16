import { createContext, useEffect, useState } from "react";
import { SERVER_URL } from "../Config/Baseurl";
import { getRefreshTokenFromCookie } from "../Utils/useAxios";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const MyContext = createContext();

export default MyContext;

const MyContextProvider = ({ children }) => {
  // Toast
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("Success");
  const [toastMessage, setToastMessage] = useState("");

  const showToastMessage = (type, message) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  // Get access token from refresh token
  const getAccessTokenFromRefreshToken = async () => {
    try {
      const refreshToken = getRefreshTokenFromCookie();

      const refreshTokenNotValid = () => {
        if (!refreshToken) return true;
        const decoded = jwtDecode(refreshToken);
        const isExpired = decoded.exp * 1000 < Date.now();
        return isExpired;
      };

      if (refreshTokenNotValid) {
        showToastMessage("Error", "Please Login Again");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }

      const response = await axios.post(`${SERVER_URL}/auth/getaccesstoken`, {
        refreshToken: refreshToken,
      });

      localStorage.setItem("accessToken", response.data.accessToken);
      setAccessToken(response.data.accessToken);
      return response.data.accessToken;
    } catch (err) {
      console.log("Error in getAccessTokenFromRefreshToken", err);
      showToastMessage("Error", "Please Login Again");
    }
  };

  // Handle Error
  const handleError = (err) => {
    console.log(err);

    if (err.code === "ERR_NETWORK") {
      showToastMessage(
        "Error",
        "Network Error, Please check your internet connection"
      );
    } else if (err.response) {
      switch (err.response.data.message) {
        case "invalid token":
        case "invalid signature":
        case "jwt malformed":
        case "jwt expired":
          getAccessTokenFromRefreshToken();
          break;

        default:
          showToastMessage("Error", err.response.data.message);
          break;
      }
    } else if (err.request) {
      showToastMessage("Error", "Server is not responding");
    } else {
      showToastMessage("Error", err.message);
    }
  };

  return (
    <MyContext.Provider
      value={{
        showToast,
        setShowToast,
        toastType,
        toastMessage,
        showToastMessage,
        handleError,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export { MyContextProvider };
