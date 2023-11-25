import React, { useContext, useState } from "react";
import MyContext from "../../Context/MyContext";

export const Message = ({ message }) => {
  const { activeConversationUser } = useContext(MyContext);
  const [msgByMe, setMsgByMe] = useState(
    message.senderId !== activeConversationUser._id ? true : false
  );

  return (
    <div className="border">
      {msgByMe ? <p>Me : </p> : <p>{activeConversationUser.fullname} : </p>}
      {message.message}
    </div>
  );
};
