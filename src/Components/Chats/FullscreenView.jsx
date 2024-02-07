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
  const handleClose = () => {
    props.setShow(false);
  };

  const renderHeaderTitle = () => {
    const date = formateDateAndTime(props.message.createdAt);
    const msgBy =
      props.msgByMe === true ? "You" : props.activeConversationUser.fullname;
    console.log(props.msgByMe);
    return `SkyMessanger - ${msgBy}, ${date}`;
  };

  const createImageName = () => {
    const date = new Date();
    console.log(date.toISOString());
    return `SkyMessanger Image ${date.toISOString()}.png`;
  };

  const handleDownload = async () => {
    const imageBlob = await fetch(props.message.message).then((r) => r.blob());
    const imageUrl = URL.createObjectURL(imageBlob);
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = createImageName();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <FullscreenViewContainer show={props.show.toString()}>
      <Header>
        <Title>{renderHeaderTitle()}</Title>
        <Button onClick={handleDownload} title="download">
          <MdOutlineFileDownload />
        </Button>

        <Button
          onClick={handleClose}
          background={"rgba(255, 0, 0, 0.7)"}
          title="close"
        >
          <IoCloseSharp />
        </Button>
      </Header>

      <FullscreenImage src={props.message.message} alt="fullscreen-img" />
    </FullscreenViewContainer>
  );
};

export default FullscreenView;
