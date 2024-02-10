import React, { useContext, useRef, useState } from "react";
import {
  AttachButton,
  EmojiButton,
  EmojiPicker,
  Form,
  TextInput,
  SendButton,
} from "../../../../Styles/Components/Chats/Footer/Footer";
import { BsSendFill } from "react-icons/bs";
import { MdEmojiEmotions } from "react-icons/md";
import { ImAttachment } from "react-icons/im";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import useOutsideClick from "../../../../Utils/useOutsideClick";
import AttachmentMenu from "./AttachmentMenu";
import Preview from "./Preview";
import { uploadFile } from "../../../../Utils/Cloudinary";
import MyContext from "../../../../Context/MyContext";

export const Footer = ({
  message,
  setMessage,
  handleMessageSend,
  handleTyping,
}) => {
  const { handleError } = useContext(MyContext);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const EmojiPickerRef = useRef(null);
  const EmojiButtonRef = useRef(null);

  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const AttachButtonRef = useRef(null);

  const [selectedImageOrVideo, setSelectedImageOrVideo] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  // Close emoji picker when clicked outside
  useOutsideClick(
    EmojiPickerRef,
    () => {
      setShowEmojiPicker(false);
    },
    showEmojiPicker,
    [EmojiButtonRef]
  );

  // Handle attach button click
  const handleAttachBtnClick = (e) => {
    e.preventDefault();
    setShowAttachMenu(!showAttachMenu);
  };

  // Close attachment menu when clicked outside
  useOutsideClick(
    AttachButtonRef,
    () => {
      setShowAttachMenu(false);
    },
    showAttachMenu
  );

  // Handle Form Submit
  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();

      let messageType = "text";
      let newMessage = message;

      const fileType = selectedImageOrVideo
        ? selectedImageOrVideo.type.split("/")[0]
        : null;

      if (fileType === "image") {
        messageType = "image";
        setPreviewLoading(true);

        const data = await uploadFile(
          selectedImageOrVideo,
          "image",
          "high_res_image_preset"
        );

        newMessage = data.secure_url;
        setPreviewLoading(false);
        setSelectedImageOrVideo(null);
      }

      if (fileType === "video") {
        messageType = "video";
        setPreviewLoading(true);

        const data = await uploadFile(
          selectedImageOrVideo,
          "video",
          "video_preset"
        );

        newMessage = data.secure_url;
        setPreviewLoading(false);
        setSelectedImageOrVideo(null);
      }

      await handleMessageSend(newMessage, messageType);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      {/* Emoji Section */}
      <EmojiButton
        onClick={() => {
          setShowEmojiPicker(!showEmojiPicker);
        }}
        ref={EmojiButtonRef}
      >
        <MdEmojiEmotions />
      </EmojiButton>

      <EmojiPicker
        showemojipicker={showEmojiPicker.toString()}
        ref={EmojiPickerRef}
      >
        <Picker
          data={data}
          previewPosition="none"
          theme="light"
          onEmojiSelect={(emoji) => {
            setMessage(message + emoji.native);
          }}
        />
      </EmojiPicker>

      {/* Attachment Section */}
      <AttachButton onClick={handleAttachBtnClick} ref={AttachButtonRef}>
        <ImAttachment />

        <AttachmentMenu
          showAttachMenu={showAttachMenu.toString()}
          setShowAttachMenu={setShowAttachMenu}
          setSelectedImageOrVideo={setSelectedImageOrVideo}
        />
      </AttachButton>

      {selectedImageOrVideo && (
        <Preview
          selectedImageOrVideo={selectedImageOrVideo}
          setSelectedImageOrVideo={setSelectedImageOrVideo}
          previewLoading={previewLoading}
        />
      )}

      {/* Input field Section */}
      <TextInput
        type="text"
        placeholder="Type a message..."
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        onKeyDown={handleTyping}
        value={message}
        autoFocus
      />

      {/* Send Button Section */}
      <SendButton type="submit" title="Send message">
        <BsSendFill />
      </SendButton>
    </Form>
  );
};
