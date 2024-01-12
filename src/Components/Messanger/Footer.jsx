import React from "react";
import { Form } from "../../Styles/Components/Messanger/Footer";
import { BsSendFill } from "react-icons/bs";

export const Footer = ({
  message,
  setMessage,
  handleMessageSend,
  handleTyping,
}) => {
  return (
    <Form onSubmit={handleMessageSend}>
      <input
        className="border border-black"
        type="text"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        onKeyDown={handleTyping}
        value={message}
      />
      <button type="submit" disabled={message === ""} title="Send message">
        <BsSendFill />
      </button>
    </Form>
  );
};
