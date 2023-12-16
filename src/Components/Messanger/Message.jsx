import React, { useContext, useState } from "react";
import UserContext from "../../Context/UserContext";
import { formateDate, formateTime } from "../../Utils/common";
import { MessangerContainer } from "../../Styles/Components/Messanger/Message";

export const Message = ({ message }) => {
  const { activeConversationUser } = useContext(UserContext);
  const [msgByMe, setMsgByMe] = useState(
    message.senderId !== activeConversationUser._id ? true : false
  );

  return (
    <MessangerContainer msgByMe={msgByMe}>
      <p>{message.message}</p>
      {/* <small>{formateDate(message.createdAt)}</small> */}
      <small>{formateTime(message.createdAt)}</small>
    </MessangerContainer>
  );
};
