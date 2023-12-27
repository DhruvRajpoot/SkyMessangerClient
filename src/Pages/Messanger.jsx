import React, { useContext, useEffect, useState } from "react";
import UserContext from "../Context/UserContext";
import { Navigate } from "react-router-dom";
import useAxios from "../Utils/useAxios";
import { Conversation } from "../Components/Messanger/Conversation";
import { ChatWindow } from "../Components/Messanger/ChatWindow";
import { io } from "socket.io-client";
import { SERVER_URL } from "../Config/Baseurl";
import {
  LeftContainer,
  MessangerContainer,
  MessangerWrapper,
  RightContainer,
} from "../Styles/Pages/Messanger";

export const Messanger = () => {
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
        <MessangerContainer>
          <h1>LoggedIn user {loggedInUser.email}</h1>
          <MessangerWrapper>
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
                      <Conversation user={user} />
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
          </MessangerWrapper>
        </MessangerContainer>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};
