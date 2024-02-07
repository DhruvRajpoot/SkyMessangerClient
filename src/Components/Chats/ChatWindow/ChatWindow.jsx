import React, { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../../../Context/UserContext";
import useAxios from "../../../Utils/useAxios";
import { Message } from "../Message";
import { Footer } from "./Footer/Footer";
import Header from "./Header/Header";
import {
  ChatWindowContainer,
  DateBlock,
  MessageContainer,
  TypingLoader,
} from "../../../Styles/Components/Chats/ChatWindow/ChatWindow";
import { formateDate, formateDateAndTime } from "../../../Utils/common";
import axios from "axios";
import { SERVER_URL } from "../../../Config/Baseurl";
import { Loading } from "../../Loading/Loading";

export const ChatWindow = () => {
  const api = useAxios();
  const { activeConversationUser, socket, loggedInUser, onlineUsers } =
    useContext(UserContext);
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [showLoading, setShowLoading] = useState(false);

  let typingTimeout = null;
  const [isTyping, setIsTyping] = useState(false);
  const lastTimeTypingSent = useRef(0);

  // Active Conversation User Ref
  const activeConversationUserRef = useRef();
  useEffect(() => {
    activeConversationUserRef.current = activeConversationUser;
  }, [activeConversationUser]);

  // Active Conversation User Lastseen
  const [activeConversationUserLastSeen, setActiveConversationUserLastSeen] =
    useState(null);

  // Fetch Active Conversation User Last Seen
  const fetchActiveConversationUserLastSeen = async () => {
    try {
      const { data } = await axios.post(`${SERVER_URL}/user/getlastseen`, {
        userId: activeConversationUser._id,
      });
      setActiveConversationUserLastSeen(data.lastseen);
    } catch (error) {
      console.log(
        `Error while fetching active conversation user last seen: ${error}`
      );
    }
  };

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
    setShowLoading(true);
    let tempConversationId = await fetchConversationId();
    if (tempConversationId !== null) {
      fetchMessages(tempConversationId);
    }
    setShowLoading(false);
  };

  // Effect runs when activeConversationUser changes
  useEffect(() => {
    setActiveConversationUserLastSeen(null);
    setIsTyping(false);
    setMessage("");
    setAllMessages([]);
    fetchConversationIdAndMessages();

    const isUserOnline = onlineUsers.find(
      (id) => id === activeConversationUserRef.current._id
    );

    if (isUserOnline) {
      setActiveConversationUserLastSeen("Online");
    } else {
      fetchActiveConversationUserLastSeen();
    }
  }, [activeConversationUser]);

  // Handle Message Send
  const handleMessageSend = async (
    message,
    messageType = "text",
    caption = undefined
  ) => {
    if (messageType === "text" && message === "") return;

    try {
      const { data } = await api.post("/messages/create", {
        conversationId: conversationId,
        message,
        messageType,
        caption,
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

  const sendIsTypingEvent = (isTyping) => {
    socket.emit("isTyping", {
      senderId: loggedInUser._id,
      receiverId: activeConversationUser._id,
      isTyping,
    });
  };

  const handleTyping = async (e) => {
    if (e.target.value === "" || !socket) return;
    try {
      clearTimeout(typingTimeout);

      if (e.key === "Enter") {
        sendIsTypingEvent(false);
        return;
      }

      if (Date.now() - lastTimeTypingSent.current > 3000) {
        sendIsTypingEvent(true);
        lastTimeTypingSent.current = Date.now();

        typingTimeout = setTimeout(() => {
          sendIsTypingEvent(false);
        }, 3000);
      }
    } catch (error) {
      console.log(`Error while typing: ${error}`);
    }
  };

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

  // Receive updateLastseen from Socket
  useEffect(() => {
    const isUserOnline = onlineUsers.find(
      (id) => id === activeConversationUserRef.current._id
    );
    setActiveConversationUserLastSeen(isUserOnline ? "Online" : Date.now());
  }, [onlineUsers]);

  // Receive isTyping from Socket
  useEffect(() => {
    if (socket) {
      socket.on("isTyping", ({ senderId, isTyping }) => {
        if (activeConversationUserRef.current._id === senderId) {
          setIsTyping(isTyping);
        }
      });

      return () => {
        socket.off("isTyping");
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
      <Header
        activeConversationUser={activeConversationUser}
        activeConversationUserLastSeen={activeConversationUserLastSeen}
      />

      <MessageContainer>
        {showLoading ? (
          <Loading />
        ) : (
          <>
            {allMessages.length !== 0 ? (
              allMessages.map((message, index) => (
                <div key={message._id}>
                  {showDateOnChange(message, index) && (
                    <DateBlock>{formateDate(message.createdAt)}</DateBlock>
                  )}
                  <Message message={message} allMessages={allMessages} />
                </div>
              ))
            ) : (
              <p>No messages</p>
            )}
          </>
        )}

        {isTyping && (
          <TypingLoader>
            <Loading type="typing" width={80} height={40} />
          </TypingLoader>
        )}

        <div ref={autoScrollRef} style={{ height: "0px", margin: "0px" }} />
      </MessageContainer>

      <Footer
        message={message}
        setMessage={setMessage}
        handleMessageSend={handleMessageSend}
        handleTyping={handleTyping}
      />
    </ChatWindowContainer>
  );
};
