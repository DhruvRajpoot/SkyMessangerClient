import React, { useRef, useState } from "react";
import {
  EmojiButton,
  EmojiPicker,
  Form,
  Input,
  SendButton,
} from "../../Styles/Components/Chats/Footer";
import { BsSendFill } from "react-icons/bs";
import { MdEmojiEmotions } from "react-icons/md";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import useOutsideClick from "../../Utils/useOutsideClick";

export const Footer = ({
  message,
  setMessage,
  handleMessageSend,
  handleTyping,
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const EmojiPickerRef = useRef(null);
  const EmojiButtonRef = useRef(null);

  useOutsideClick(
    EmojiPickerRef,
    () => {
      console.log("Clicked outside picker");
      setShowEmojiPicker(false);
    },
    [EmojiButtonRef]
  );

  return (
    <Form onSubmit={handleMessageSend}>
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

      <Input
        type="text"
        placeholder="Type a message..."
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        onKeyDown={handleTyping}
        value={message}
        autoFocus
      />

      <SendButton type="submit" disabled={message === ""} title="Send message">
        <BsSendFill />
      </SendButton>
    </Form>
  );
};
