import React, { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../../Context/UserContext";
import useAxios from "../../Utils/useAxios";
import { Message } from "./Message";
import { Footer } from "./Footer";
import {
  ChatWindowContainer,
  DateBlock,
  Header,
  LeftContainer,
  MessageContainer,
  MiddleContainer,
  RightContainer,
} from "../../Styles/Components/Messanger/ChatWindow";
import { formateDate } from "../../Utils/common";

export const ChatWindow = () => {
  const api = useAxios();
  const { activeConversationUser, socket } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);

  // Fetch Conversation Id of active conversation user
  const fetchConversationId = async () => {
    try {
      const { data } = await api.post("/conversation/fetch", {
        receiverId: activeConversationUser._id,
      });
      setConversationId(data._id);
      return data._id;
    } catch (error) {
      console.log(`Error while fetching conversation id : ${error}`);
    }
  };

  // Fetch messages of active conversation user
  const fetchMessages = async (id) => {
    try {
      const { data } = await api.post(`/messages/getmessages/${id}`);
      setAllMessages(data);
    } catch (error) {
      console.log(`Error while fetching messages: ${error}`);
    }
  };

  // Function to call fetchConversationId and fetchMessages
  const fetchConversationIdAndMessages = async () => {
    let tempConversationId = await fetchConversationId();
    if (tempConversationId !== null) {
      fetchMessages(tempConversationId);
    }
  };

  useEffect(() => {
    setAllMessages([]);
    fetchConversationIdAndMessages();
  }, [activeConversationUser]);

  // Handle Message Send
  const handleMessageSend = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/messages/create", {
        conversationId: conversationId,
        message,
      });
      setAllMessages((prev) => [...prev, data]);
      setMessage("");
      socket.emit("sendMessage", {
        receiverId: activeConversationUser._id,
        message: data,
      });
    } catch (error) {
      console.log(`Error while sending message: ${error}`);
    }
  };

  // Active Conversation User Ref
  const activeConversationUserRef = useRef();
  useEffect(() => {
    activeConversationUserRef.current = activeConversationUser;
  }, [activeConversationUser]);

  // Receive Message from Socket
  useEffect(() => {
    if (socket) {
      socket.on("getMessage", ({ message, receiverId }) => {
        activeConversationUserRef.current._id !== message.senderId
          ? console.log("show notification")
          : setAllMessages((prev) => [...prev, message]);
      });

      return () => {
        socket.off("getMessage");
      };
    }
  }, []);

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

  // Show Date when date changes (when new day starts)
  const showDateOnChange = (message, index) => {
    if (index === 0) {
      return true;
    }
    const currentDate = new Date(message.createdAt).toLocaleDateString();
    const previousDate = new Date(
      allMessages[index - 1].createdAt
    ).toLocaleDateString();

    return currentDate !== previousDate;
  };

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
        {allMessages.map((message, index) => (
          <div key={message._id}>
            {showDateOnChange(message, index) && (
              <DateBlock>{formateDate(message.createdAt)}</DateBlock>
            )}
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
