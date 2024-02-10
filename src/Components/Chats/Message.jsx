import React, { useContext, useState } from "react";
import UserContext from "../../Context/UserContext";
import { formateTime } from "../../Utils/common";
import {
  MessageContainer,
  MessageWrapper,
  ProfilePic,
  ProfilePicContainer,
} from "../../Styles/Components/Chats/Message";
import FullscreenView from "./FullscreenView";

export const Message = ({ message, allMessages }) => {
  const { activeConversationUser } = useContext(UserContext);
  const msgByMe =
    message.senderId !== activeConversationUser._id ? "true" : "false";

  const showProfile = () => {
    if (msgByMe === "true") return false;
    const index = allMessages.indexOf(message);
    if (index === allMessages.length - 1) return true;
    const nextMsg = allMessages[index + 1];
    if (nextMsg.senderId !== message.senderId) return true;
    return false;
  };

  const renderMessage = () => {
    switch (message.messageType) {
      case "image":
        return (
          <img
            src={message.message}
            alt="image"
            onClick={handleShowFullScreen}
            loading="lazy"
          />
        );

      case "video":
        return (
          <video controls loading="lazy" width="100%" height="auto">
            <source src={message.message} type="video/mp4" />
            Your browser does not support the video tag. Try using a different
            browser or paste the link in the address bar. Link :{" "}
            {message.message}
          </video>
        );

      default:
        return <p>{message.message}</p>;
    }
  };

  const [showFullScreen, setShowFullScreen] = useState(false);
  const handleShowFullScreen = () => {
    setShowFullScreen(!showFullScreen);
  };

  return (
    <MessageContainer>
      {showProfile() && (
        <ProfilePicContainer>
          {activeConversationUser.profileInfo.pic ? (
            <ProfilePic
              src={activeConversationUser.profileInfo.pic}
              alt={activeConversationUser.fullname}
            />
          ) : (
            activeConversationUser.fullname[0]
          )}
        </ProfilePicContainer>
      )}

      <MessageWrapper msgbyme={msgByMe} showprofile={showProfile().toString()}>
        {renderMessage()}
        <small>{formateTime(message.createdAt)}</small>
      </MessageWrapper>

      {message.messageType === "image" && showFullScreen && (
        <FullscreenView
          show={showFullScreen}
          setShow={setShowFullScreen}
          msgByMe={msgByMe}
          message={message}
          activeConversationUser={activeConversationUser}
        />
      )}
    </MessageContainer>
  );
};
