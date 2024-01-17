import React, { useContext, useState } from "react";
import UserContext from "../../Context/UserContext";
import { formateTime } from "../../Utils/common";
import { MessangerContainer } from "../../Styles/Components/Chats/Message";

export const Message = ({ message }) => {
  const { activeConversationUser } = useContext(UserContext);
  const msgByMe =
    message.senderId !== activeConversationUser._id ? "true" : "false";

  return (
    <MessangerContainer msgbyme={msgByMe}>
      <p>{message.message}</p>
      <small>{formateTime(message.createdAt)}</small>
    </MessangerContainer>
  );
};
