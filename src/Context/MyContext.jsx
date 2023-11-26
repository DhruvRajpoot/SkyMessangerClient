import { createContext, useEffect, useState } from "react";
import { SERVER_URL } from "../Config/Baseurl";
import { io } from "socket.io-client";

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

  // Online Users
  const [onlineUsers, setOnlineUsers] = useState([]);

  // Socket Connection
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    if (!loggedInUser) return;
    const newSocket = io(SERVER_URL);
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, [loggedInUser]);

  // Online Users List
  useEffect(() => {
    if (socket && loggedInUser) {
      socket.emit("addNewUser", loggedInUser._id);

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => {
        socket.off("getOnlineUsers");
      };
    }
  }, [socket, loggedInUser]);

  return (
    <MyContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
        activeConversationUser,
        setActiveConversationUser,
        socket,
        onlineUsers,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export { MyContextProvider };
