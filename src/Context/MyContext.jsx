import { createContext, useEffect, useState } from "react";

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

  // Handle Error
  const handleError = (err) => {
    console.log(err);

    if (err.code === "ERR_NETWORK") {
      showToastMessage(
        "Error",
        "Network Error, Please check your internet connection"
      );
    } else if (err.response) {
      // Request made and server responded
      switch (err.response.data.message) {
        case "invalid token":
        case "invalid signature":
        case "jwt malformed":
          showToastMessage("Error", "Invalid Token, Please Login Again");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          window.location.href = "/login";
          break;

        default:
          showToastMessage("Error", err.response.data.message);
          break;
      }
    } else if (err.request) {
      // The request was made but no response was received
      showToastMessage("Error", "Server is not responding");
    } else {
      // Something happened in setting up the request that triggered an Error
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
