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

  const [selectedFile, setSelectedFile] = useState(null);
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
      let result = null;

      if (selectedFile) {
        const fileType = selectedFile ? selectedFile.type.split("/")[0] : null;
        switch (fileType) {
          case "image":
            messageType = "image";
            setPreviewLoading(true);

            result = await uploadFile(
              selectedFile,
              "image",
              "high_res_image_preset"
            );

            newMessage = result.secure_url;
            setPreviewLoading(false);
            setSelectedFile(null);

            break;

          case "video":
            messageType = "video";
            setPreviewLoading(true);

            result = await uploadFile(selectedFile, "video", "video_preset");

            newMessage = result.secure_url;
            setPreviewLoading(false);
            setSelectedFile(null);
            break;

          default:
            messageType = "document";
            setPreviewLoading(true);

            result = await uploadFile(selectedFile, "auto", "document_preset");

            newMessage = result.secure_url;
            setPreviewLoading(false);
            setSelectedFile(null);
            break;
        }
      }

      await handleMessageSend(newMessage, messageType);
    } catch (error) {
      setSelectedFile(null);
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
          setSelectedFile={setSelectedFile}
        />
      </AttachButton>

      {selectedFile && (
        <Preview
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
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
