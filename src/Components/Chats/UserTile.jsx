import React, { useContext } from "react";
import UserContext from "../../Context/UserContext";
import {
  UserTileContainer,
  LeftContainer,
  MiddleContainer,
  OnlineIndicator,
  RightContainer,
} from "../../Styles/Components/Chats/UserTile";
import LazyLoad from "react-lazy-load";

export const UserTile = ({ user }) => {
  const { onlineUsers } = useContext(UserContext);
  const isOnline = onlineUsers.find((id) => id === user._id);

  return (
    <UserTileContainer>
      <LeftContainer>
        {user?.profileInfo?.pic !== null ? (
          <LazyLoad offset={100} debounce={false} throttle={250}>
            <img src={user?.profileInfo?.pic} />
          </LazyLoad>
        ) : (
          user?.fullname[0]
        )}
      </LeftContainer>

      <MiddleContainer>
        <h3>{user?.email}</h3>
        <p>{user?.fullname}</p>
      </MiddleContainer>

      <RightContainer>
        <OnlineIndicator useronline={isOnline ? "true" : "false"} />
      </RightContainer>
    </UserTileContainer>
  );
};
