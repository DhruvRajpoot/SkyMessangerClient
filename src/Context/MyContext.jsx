import { createContext, useEffect, useState } from "react";

const MyContext = createContext();

export default MyContext;

const MyContextProvider = ({ children }) => {
  // Logged In User Data
  const [loggedInUser, setLoggedInUser] = useState(() =>
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  // Update Logged In User Data
  useEffect(() => {
    const loggedInUserData = JSON.parse(localStorage.getItem("user"));
    if (loggedInUserData) {
      setLoggedInUser(loggedInUserData);
    }
  }, []);

  // Active Conversation User
  const [activeConversationUser, setActiveConversationUser] = useState(null);

  return (
    <MyContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
        activeConversationUser,
        setActiveConversationUser,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export { MyContextProvider };
