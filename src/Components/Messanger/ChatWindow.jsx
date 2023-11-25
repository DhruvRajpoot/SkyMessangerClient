import React, { useContext, useEffect, useState } from "react";
import MyContext from "../../Context/MyContext";
import useAxios from "../../Utils/useAxios";
import { Message } from "./Message";

export const ChatWindow = () => {
  const api = useAxios();
  const { activeConversationUser } = useContext(MyContext);
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);

  const fetchConversation = async () => {
    try {
      const { data } = await api.post("/conversation/find", {
        receiverId: activeConversationUser._id,
      });
      if (data.length > 0) {
        setConversationId(data[0]._id);
        return data[0]._id;
      }
      return null;
    } catch (error) {
      console.log(`Error while fetching conversation: ${error}`);
    }
  };

  const setUpConversation = async () => {
    try {
      const { data } = await api.post("/conversation/create", {
        receiverId: activeConversationUser._id,
      });
      setConversationId(data._id);
      return data._id;
    } catch (error) {
      console.log(`Error while creating conversation: ${error}`);
    }
  };

  const handleMessageSend = async (e) => {
    e.preventDefault();
    try {
      let tempConversationId = "";
      if (conversationId === null) {
        tempConversationId = await setUpConversation();
      }
      await api.post("/messages/create", {
        conversationId: conversationId || tempConversationId,
        message,
      });
      setMessage("");
    } catch (error) {
      console.log(`Error while sending message: ${error}`);
    }
  };

  const fetchMessages = async (id) => {
    try {
      const { data } = await api.post(`/messages/getmessages/${id}`);
      setAllMessages(data);
    } catch (error) {
      console.log(`Error while fetching messages: ${error}`);
    }
  };

  const fetchConversationAndMessages = async () => {
    let tempConversationId = await fetchConversation();
    if (tempConversationId !== null) {
      fetchMessages(tempConversationId);
    }
  };

  useEffect(() => {
    fetchConversationAndMessages();
  }, [activeConversationUser]);

  return (
    <div className="bg-gray-300">
      <h1>{activeConversationUser.email}</h1>
      <h1>{activeConversationUser.fullname}</h1>
      <form onSubmit={handleMessageSend}>
        <input
          type="text"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          value={message}
        />
        <button type="submit">Send</button>
      </form>
      <h1>Messages</h1>
      <div className="bg-blue-50">
        {allMessages.map((message) => (
          <Message key={message._id} message={message} />
        ))}
      </div>
    </div>
  );
};
