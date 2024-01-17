import React, { useContext, useEffect, useState } from "react";
import UserContext from "../Context/UserContext";
import { Navigate } from "react-router-dom";
import useAxios from "../Utils/useAxios";
import { UserTile } from "../Components/Chats/UserTile";
import { ChatWindow } from "../Components/Chats/ChatWindow";
import { io } from "socket.io-client";
import { SERVER_URL } from "../Config/Baseurl";
import {
  ChatContainer,
  ChatWrapper,
  LeftContainer,
  RightContainer,
} from "../Styles/Pages/Chats";

export const Chats = () => {
  const api = useAxios();
  const {
    loggedInUser,
    activeConversationUser,
    setActiveConversationUser,
    setSocket,
  } = useContext(UserContext);
  const [users, setUsers] = useState([]);

  // Make user online
  useEffect(() => {
    if (!loggedInUser) return;
    const newSocket = io(SERVER_URL);
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, [loggedInUser]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await api.get("/user/getallusers");

        if (response.status === 200) {
          setUsers(response.data.users);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getUsers();
  }, [loggedInUser]);

  return (
    <div>
      {loggedInUser !== null ? (
        <ChatContainer>
          <h1>LoggedIn user {loggedInUser.email}</h1>
          <ChatWrapper>
            {/* Left Side to show all user */}
            <LeftContainer>
              {users.map(
                (user) =>
                  user._id !== loggedInUser._id && (
                    <div
                      key={user._id}
                      onClick={() => {
                        setActiveConversationUser(user);
                      }}
                    >
                      <UserTile user={user} />
                    </div>
                  )
              )}
            </LeftContainer>

            {/* Right Side to show selected user chat window*/}
            <RightContainer>
              {activeConversationUser !== null ? (
                <ChatWindow />
              ) : (
                <div>Please select a user to start chat</div>
              )}
            </RightContainer>
          </ChatWrapper>
        </ChatContainer>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};
