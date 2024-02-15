import React, { useContext, useState } from "react";
import UserContext from "../../../Context/UserContext";
import { formateTime, handleDownload, sliceText } from "../../../Utils/common";
import {
  Icon,
  IconContainer,
  MessageContainer,
  MessageWrapper,
  ProfilePic,
  ProfilePicContainer,
} from "../../../Styles/Components/Chats/ChatWindow/Message";
import FullscreenView from "../FullscreenView";
import { FaFile, FaLocationDot } from "react-icons/fa6";
import { FaFilePdf } from "react-icons/fa";
import { BsFiletypePpt, BsFillFileEarmarkTextFill } from "react-icons/bs";
import { SiGoogledocs, SiGooglesheets } from "react-icons/si";

export const Message = ({ message, allMessages }) => {
  const { activeConversationUser } = useContext(UserContext);
  const msgByMe =
    message.senderId !== activeConversationUser._id ? "true" : "false";

  // Show profile pic if the message is sent by the other user
  const showProfile = () => {
    if (msgByMe === "true") return false;
    const index = allMessages.indexOf(message);
    if (index === allMessages.length - 1) return true;
    const nextMsg = allMessages[index + 1];
    if (nextMsg.senderId !== message.senderId) return true;
    return false;
  };

  // Function to parse text and render URLs as links
  const renderTextWithLinks = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a key={index} href={part} target="_blank" rel="noopener noreferrer">
            {part}
          </a>
        );
      } else {
        return <span key={index}>{part}</span>;
      }
    });
  };

  // Render message based on the message type
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
        let icon, backgroundColor, color;

        switch (fileExtension) {
          case "pdf":
            icon = <FaFilePdf />;
            backgroundColor = "#d60000";
            color = "#fff";
            break;

          case "doc":
          case "docx":
            icon = <SiGoogledocs />;
            backgroundColor = "#2580f5";
            color = "#fff";
            break;

          case "ppt":
          case "pptx":
            icon = <BsFiletypePpt />;
            backgroundColor = "#ce502f";
            color = "#fff";
            break;

          case "xls":
          case "xlsx":
            icon = <SiGooglesheets />;
            backgroundColor = "#1f6e43";
            color = "#fff";
            break;

          case "txt":
            icon = <BsFillFileEarmarkTextFill />;
            backgroundColor = "#000";
            color = "#fff";
            break;

          default:
            icon = <FaFile />;
            backgroundColor = "#000";
            color = "#fff";
        }

        return (
          <IconContainer
            onClick={() => {
              handleDownload(fileSrc);
            }}
            title="Download"
          >
            <Icon backgroundcolor={backgroundColor} color={color}>
              {icon}
            </Icon>
            <p>{sliceText(fileName, 45)}</p>
          </IconContainer>
        );

      case "location":
        return (
          <IconContainer>
            <span>
              <FaLocationDot />
            </span>
            <p>{renderTextWithLinks(message.message)}</p>
          </IconContainer>
        );

      default:
        return <p>{renderTextWithLinks(message.message)}</p>;
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
