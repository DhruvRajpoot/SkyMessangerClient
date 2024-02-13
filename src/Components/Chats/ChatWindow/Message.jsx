import React, { useContext, useState } from "react";
import UserContext from "../../../Context/UserContext";
import { formateTime, handleDownload, sliceText } from "../../../Utils/common";
import {
  IconContainer,
  MessageContainer,
  MessageWrapper,
  ProfilePic,
  ProfilePicContainer,
} from "../../../Styles/Components/Chats/ChatWindow/Message";
import FullscreenView from "../FullscreenView";
import { FaFile, FaFilePdf } from "react-icons/fa6";
import { BsFiletypePpt, BsFiletypeTxt } from "react-icons/bs";
import { SiGoogledocs, SiGooglesheets } from "react-icons/si";

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
    const fileSrc = message.message;

    switch (message.messageType) {
      case "image":
        return (
          <img
            src={fileSrc}
            alt="image"
            onClick={handleShowFullScreen}
            loading="lazy"
          />
        );

      case "video":
        return (
          <video controls loading="lazy" width="100%" height="auto">
            <source src={fileSrc} type="video/mp4" />
            Your browser does not support the video tag. Try using a different
            browser or paste the link in the address bar. Link : {fileSrc}
          </video>
        );

      case "document":
        const fileName = fileSrc.split("/").pop();
        const fileExtension = fileName.split(".").pop();
        let icon;

        switch (fileExtension) {
          case "pdf":
            icon = <FaFilePdf />;
            break;

          case "doc":
          case "docx":
            icon = <SiGoogledocs />;
            break;

          case "ppt":
          case "pptx":
            icon = <BsFiletypePpt />;
            break;

          case "xls":
          case "xlsx":
            icon = <SiGooglesheets />;
            break;

          case "txt":
            icon = <BsFiletypeTxt />;
            break;

          default:
            icon = <FaFile />;
        }

        return (
          <IconContainer
            onClick={() => {
              handleDownload(fileSrc);
            }}
            title="Download"
          >
            <span>{icon}</span>
            <p>{sliceText(fileName, 45)}</p>
          </IconContainer>
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
