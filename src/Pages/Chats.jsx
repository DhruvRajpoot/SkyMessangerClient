import React, { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import useAxios from "../Utils/useAxios";
import { UserTile } from "../Components/Chats/UserTile";
import { ChatWindow } from "../Components/Chats/ChatWindow/ChatWindow";
import { io } from "socket.io-client";
import { SERVER_URL } from "../Config/Baseurl";
import {
  ChatContainer,
  ChatWrapper,
  LeftContainer,
  ProfilePic,
  ProfilePicContainer,
  RightContainer,
  Sidebar,
  Title,
  UsersList,
} from "../Styles/Pages/Chats";
import { SideDrawer } from "../Components/Chats/Sidebar/SideDrawer";
import MyContext from "../Context/MyContext";
import { Loading } from "../Components/Loading/Loading";

export const Chats = () => {
  const api = useAxios();
  const navigate = useNavigate();
  const { handleError } = useContext(MyContext);
  const { showToastMessage } = useContext(MyContext);
  const {
    accessToken,
    loggedInUser,
    activeConversationUser,
    setActiveConversationUser,
    setSocket,
  } = useContext(UserContext);

  const [users, setUsers] = useState([]);

  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);
  const profilePicContainerRef = useRef(null);

  const toggleSideDrawer = () => {
    setIsSideDrawerOpen(!isSideDrawerOpen);
  };

  // Check if user is logged in
  useEffect(() => {
    if (accessToken === null) {
      showToastMessage("Error", "Please login to continue");
      navigate("/login");
    }
  }, [accessToken]);

  // Make user online
  useEffect(() => {
    if (!loggedInUser) return;
    const newSocket = io(SERVER_URL);
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, [loggedInUser]);

  // Fetch all users
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await api.get("/user/getallusers");

        if (response.status === 200) {
          setUsers(response.data.users);
        }
      } catch (err) {
        handleError(err);
      }
    };

    if (accessToken !== null && loggedInUser !== null) {
      getUsers();
    }
  }, [accessToken, loggedInUser]);

  return (
    <ChatContainer>
      <ChatWrapper>
        {/* Sidebar to show additional info */}
        <Sidebar>
          <ProfilePicContainer
            onClick={toggleSideDrawer}
            ref={profilePicContainerRef}
          >
            {loggedInUser?.profileInfo?.pic !== null ? (
              <ProfilePic src={loggedInUser?.profileInfo?.pic} />
            ) : (
              loggedInUser?.fullname[0]
            )}
          </ProfilePicContainer>

          <SideDrawer
            toggleSideDrawer={toggleSideDrawer}
            isOpen={isSideDrawerOpen}
            setIsOpen={setIsSideDrawerOpen}
            excludeRefs={[profilePicContainerRef]}
          />
        </Sidebar>

        {/* User List to show all user */}
        <LeftContainer>
          <Title>Chats</Title>

          <UsersList>
            {loggedInUser ? (
              users.map(
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
              )
            ) : (
              <Loading />
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
  );
};
