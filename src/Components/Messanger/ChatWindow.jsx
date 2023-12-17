import React, { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../../Context/UserContext";
import useAxios from "../../Utils/useAxios";
import { Message } from "./Message";
import { Footer } from "./Footer";
import {
  ChatWindowContainer,
  Header,
  LeftContainer,
  MessageContainer,
  MiddleContainer,
  RightContainer,
} from "../../Styles/Components/Messanger/ChatWindow";

export const ChatWindow = () => {
  const api = useAxios();
  const { activeConversationUser, socket, loggedInUser } =
    useContext(UserContext);
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

  useEffect(() => {
    setUpConversation();
  }, [activeConversationUser]);

  const handleMessageSend = async (e) => {
    e.preventDefault();
    try {
      let tempConversationId = "";
      if (conversationId === null) {
        tempConversationId = await setUpConversation();
      }
      const { data } = await api.post("/messages/create", {
        conversationId: conversationId || tempConversationId,
        message,
      });
      fetchMessages(conversationId || tempConversationId);
      setMessage("");
      socket.emit("sendMessage", {
        receiverId: activeConversationUser._id,
        message: data,
      });
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
    setAllMessages([]);
    fetchConversationAndMessages();
  }, [activeConversationUser]);

  // Receive Message from Socket
  useEffect(() => {
    if (socket) {
      socket.on("getMessage", ({ message, receiverId }) => {
        loggedInUser._id === receiverId &&
          activeConversationUser._id === message.senderId &&
          setAllMessages((prev) => [...prev, message]);
      });

      return () => {
        socket.off("getMessage");
      };
    }
  }, [socket, loggedInUser, activeConversationUser]);

  // Auto Scroll to bottom
  const autoScrollRef = useRef(null);
  useEffect(() => {
    if (allMessages.length) {
      autoScrollRef.current?.scrollIntoView({
        behaviour: "smooth",
        block: "end",
      });
    }
  }, [allMessages.length]);

  return (
    <ChatWindowContainer>
      <Header>
        <LeftContainer>{activeConversationUser.fullname[0]}</LeftContainer>
        <MiddleContainer>
          <h3>{activeConversationUser.email}</h3>
          <h3>{activeConversationUser.fullname}</h3>
        </MiddleContainer>
        <RightContainer>menu {/* Menu Icon */}</RightContainer>
      </Header>

      <MessageContainer>
        {allMessages.map((message) => (
          <div key={message._id}>
            <Message message={message} />
          </div>
        ))}
        <div ref={autoScrollRef} />
      </MessageContainer>

      <Footer
        message={message}
        setMessage={setMessage}
        handleMessageSend={handleMessageSend}
      />
    </ChatWindowContainer>
  );
};
