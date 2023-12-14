import React, { useContext, useState } from "react";
import UserContext from "../../Context/UserContext";
import { formateDate, formateTime } from "../../Utils/common";

export const Message = ({ message }) => {
  const { activeConversationUser } = useContext(UserContext);
  const [msgByMe, setMsgByMe] = useState(
    message.senderId !== activeConversationUser._id ? true : false
  );

  return (
    <div className="border flex gap-2">
      <p>{msgByMe ? "Me" : activeConversationUser.fullname} :</p>
      <p>{message.message}</p>
      <small>{formateDate(message.createdAt)}</small>
      <small>{formateTime(message.createdAt)}</small>
    </div>
  );
};
