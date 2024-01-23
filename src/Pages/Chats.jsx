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
  ProfilePic,
  RightContainer,
  Sidebar,
  Title,
  UsersList,
} from "../Styles/Pages/Chats";
import { SideDrawer } from "../Components/Chats/SideDrawer";

export const Chats = () => {
  const api = useAxios();
  const {
    loggedInUser,
    activeConversationUser,
    setActiveConversationUser,
    setSocket,
  } = useContext(UserContext);
  const [users, setUsers] = useState([]);

  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);

  const toggleSideDrawer = () => {
    setIsSideDrawerOpen(!isSideDrawerOpen);
  };

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
          <ChatWrapper>
            {/* Sidebar to show additional info */}
            <Sidebar>
              <ProfilePic
                src={loggedInUser.profilePic}
                onClick={toggleSideDrawer}
              />

              <SideDrawer
                toggleSideDrawer={toggleSideDrawer}
                isOpen={isSideDrawerOpen}
              />
            </Sidebar>

            {/* User List to show all user */}
            <LeftContainer>
              <Title>Chats</Title>

              <UsersList>
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
              </UsersList>
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