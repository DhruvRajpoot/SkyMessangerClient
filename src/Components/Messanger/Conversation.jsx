import React, { useContext } from "react";
import UserContext from "../../Context/UserContext";
import {
  ConversationContainer,
  LeftContainer,
  MiddleContainer,
  OnlineIndicator,
  RightContainer,
} from "../../Styles/Components/Messanger/Conversation";

export const Conversation = ({ user }) => {
  const { onlineUsers } = useContext(UserContext);
  const isOnline = onlineUsers.find((id) => id === user._id);

  return (
    <ConversationContainer>
      <LeftContainer>{user.fullname[0]}</LeftContainer>
      <MiddleContainer>
        <h3>{user.email}</h3>
        <p>{user.fullname}</p>
      </MiddleContainer>

      <RightContainer>
        <OnlineIndicator useronline={isOnline ? "true" : "false"} />
      </RightContainer>
    </ConversationContainer>
  );
};
