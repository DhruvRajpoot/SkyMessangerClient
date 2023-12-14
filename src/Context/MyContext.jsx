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

  return (
    <MyContext.Provider
      value={{
        showToast,
        setShowToast,
        toastType,
        toastMessage,
        showToastMessage,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export { MyContextProvider };
