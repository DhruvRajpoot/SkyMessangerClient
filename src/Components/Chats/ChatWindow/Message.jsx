import React, { useContext, useRef, useState } from "react";
import UserContext from "../../../Context/UserContext";
import { formateTime, handleDownload, sliceText } from "../../../Utils/common";
import {
  Icon,
  IconContainer,
  MessageContainer,
  MessageMenu,
  MessageWrapper,
  ProfilePic,
  ProfilePicContainer,
  MessageMenuBtn,
  Small,
  Text,
} from "../../../Styles/Components/Chats/ChatWindow/Message";
import FullscreenView from "../FullscreenView";
import { FaCaretDown, FaFile, FaLocationDot } from "react-icons/fa6";
import { FaFilePdf } from "react-icons/fa";
import { BsFiletypePpt, BsFillFileEarmarkTextFill } from "react-icons/bs";
import { SiGoogledocs, SiGooglesheets } from "react-icons/si";
import useOutSideClick from "../../../Utils/useOutsideClick";
import { MdContentCopy } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import MyContext from "../../../Context/MyContext";

export const Message = ({ message, allMessages }) => {
  const { activeConversationUser } = useContext(UserContext);
  const { showToastMessage } = useContext(MyContext);
  const [showMessageMenuBtn, setShowMessageMenuBtn] = useState(false);
  const [showMessageMenu, setShowMessageMenu] = useState(false);
  const messageWrapperRef = useRef(null);
  const messageMenuBtnRef = useRef(null);
  const messageMenuRef = useRef(null);

  // Function to handle message options menu
  const handleMessageOptionsMenu = (e) => {
    e.preventDefault();
    setShowMessageMenu(!showMessageMenu);
  };

  // Close message menu and btn on click outside hover
  useOutSideClick(
    messageWrapperRef,
    () => {
      setShowMessageMenuBtn(false);
      setShowMessageMenu(false);
    },
    showMessageMenu,
    [messageMenuBtnRef, messageMenuRef]
  );

  // Function to copy message to clipboard
  const handleCopyMessage = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(message.message);
    setShowMessageMenu(false);
    setShowMessageMenuBtn(false);
    showToastMessage("Info", "Message copied to clipboard");
  };

  // Function to delete message
  const handleDeleteMessage = (e) => {
    e.preventDefault();
    console.log("Delete message");
    setShowMessageMenu(false);
    setShowMessageMenuBtn(false);
  };

  // Check if the message is sent by the current user
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
            <Text>{sliceText(fileName, 45)}</Text>
          </IconContainer>
        );

      case "location":
        return (
          <IconContainer>
            <span>
              <FaLocationDot />
            </span>
            <Text>{renderTextWithLinks(message.message)}</Text>
          </IconContainer>
        );

      default:
        return <Text>{renderTextWithLinks(message.message)}</Text>;
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

      <MessageWrapper
        msgbyme={msgByMe}
        showprofile={showProfile().toString()}
        ref={messageWrapperRef}
        onMouseEnter={() => setShowMessageMenuBtn(true)}
        onMouseLeave={() => {
          if (!showMessageMenu) {
            setShowMessageMenuBtn(false);
            setShowMessageMenu(false);
          }
        }}
      >
        {renderMessage()}

        <Small msgbyme={msgByMe}>{formateTime(message.createdAt)}</Small>

        {showMessageMenuBtn && (
          <MessageMenuBtn
            msgbyme={msgByMe}
            onClick={(e) => {
              handleMessageOptionsMenu(e);
            }}
            ref={messageMenuBtnRef}
          >
            <span>
              <FaCaretDown />
            </span>
          </MessageMenuBtn>
        )}

        {showMessageMenu && (
          <MessageMenu msgbyme={msgByMe} ref={messageMenuRef}>
            <span onClick={handleCopyMessage}>
              <MdContentCopy /> Copy
            </span>

            <span onClick={handleDeleteMessage}>
              <RiDeleteBin6Line /> Delete
            </span>
          </MessageMenu>
        )}
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
