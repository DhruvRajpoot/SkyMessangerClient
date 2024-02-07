import React from "react";
import {
  Button,
  FullscreenImage,
  FullscreenViewContainer,
  Header,
  Title,
} from "../../Styles/Components/Chats/FullscreenView";
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import { formateDateAndTime } from "../../Utils/common";

const FullscreenView = (props) => {
  // Function to handle close
  const handleClose = (e) => {
    props.setShow(false);
    e.stopPropagation();
  };

  // Image Url
  const image = props.forProfilePic
    ? props?.activeConversationUser?.profileInfo?.pic
    : props?.message?.message;

  // Header Title
  const renderHeaderTitle = () => {
    if (props.forProfilePic) {
      return `SkyMessanger - ${props?.activeConversationUser?.fullname} Profile Picture`;
    }

    const msgBy =
      props.msgByMe === true ? "You" : props?.activeConversationUser?.fullname;
    const date = formateDateAndTime(props.message.createdAt);
    return `SkyMessanger - ${msgBy}, ${date}`;
  };

  // Function to create image name
  const createImageName = () => {
    const date = new Date();
    console.log(date.toISOString());
    return `SkyMessanger Image ${date.toISOString()}.png`;
  };

  // Function to handle download
  const handleDownload = async () => {
    const imageBlob = await fetch(image).then((r) => r.blob());
    const imageUrl = URL.createObjectURL(imageBlob);
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = createImageName();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <FullscreenViewContainer>
      <Header>
        <Title>{renderHeaderTitle()}</Title>
        {props.forProfilePic !== true && (
          <Button onClick={handleDownload} title="download">
            <MdOutlineFileDownload />
          </Button>
        )}

        <Button
          onClick={handleClose}
          background={"rgba(255, 0, 0, 0.7)"}
          title="close"
        >
          <IoCloseSharp />
        </Button>
      </Header>

      <FullscreenImage src={image} alt="fullscreen-img" />
    </FullscreenViewContainer>
  );
};

export default FullscreenView;
