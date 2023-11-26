import React from "react";

export const Footer = ({ message, setMessage, handleMessageSend }) => {
  return (
    <div>
      <form onSubmit={handleMessageSend}>
        <input
          className="border border-black"
          type="text"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          value={message}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};
