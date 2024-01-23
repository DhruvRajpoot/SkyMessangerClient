import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

export default UserContext;

const UserContextProvider = ({ children }) => {
  // Access Token
  const [accessToken, setAccessToken] = useState(() =>
    localStorage.getItem("accessToken")
      ? localStorage.getItem("accessToken")
      : null
  );

  // Logged In User Data
  const [loggedInUser, setLoggedInUser] = useState(() =>
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  // Update Logged In User Data
  useEffect(() => {
    try {
      if (accessToken !== null) {
        const user = jwtDecode(accessToken);
        setLoggedInUser(user);
        localStorage.setItem("user", JSON.stringify(user));
      }
    } catch (err) {
      console.log(err);
    }
  }, [accessToken]);

  // Active Conversation User
  const [activeConversationUser, setActiveConversationUser] = useState(null);

  // Online Users
  const [onlineUsers, setOnlineUsers] = useState([]);

  // Socket Connection
  const [socket, setSocket] = useState(null);

  // Online Users List
  useEffect(() => {
    if (socket && loggedInUser) {
      socket.emit("userConnected", loggedInUser._id);

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => {
        socket.off("getOnlineUsers");
      };
    }
  }, [socket, loggedInUser]);

  return (
    <UserContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
        activeConversationUser,
        setActiveConversationUser,
        socket,
        setSocket,
        onlineUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider };
