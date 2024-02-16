import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { SERVER_URL } from "../Config/Baseurl";
import MyContext from "./MyContext";

const UserContext = createContext();

export default UserContext;

const UserContextProvider = ({ children }) => {
  const { handleError } = useContext(MyContext);

  // Access Token
  const [accessToken, setAccessToken] = useState(() =>
    localStorage.getItem("accessToken")
      ? localStorage.getItem("accessToken")
      : null
  );

  // Logged In User Data
  const [loggedInUser, setLoggedInUser] = useState(() =>
    localStorage.getItem("user") ? null : null
  );

  // Fetch user data using access token
  const fetchUserData = async (accessToken) => {
    try {
      const response = await axios.get(`${SERVER_URL}/user/getuserdetails`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        setLoggedInUser(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    try {
      if (accessToken !== null) {
        fetchUserData(accessToken);
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

  // Update Online Users List on Socket Connection
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
  }, [socket]);

  return (
    <UserContext.Provider
      value={{
        accessToken,
        setAccessToken,
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
