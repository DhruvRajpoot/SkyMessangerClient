import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ScrollToBottomButton } from "../../../Styles/Components/Chats/ChatWindow/ChatWindow";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

const ScrollToBottom = (props) => {
  const { messageContainerRef, allMessages } = props;
  const scrollToBottomButtonRef = useRef(null);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);

  // Function to check whether the chat window is scrolled to the bottom
  const checkScrollPosition = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } =
      messageContainerRef.current;

    setScrolledToBottom(scrollTop + clientHeight >= scrollHeight - 5);
  }, []);

  // Effect to check scroll position on scroll
  useEffect(() => {
    const container = messageContainerRef.current;
    container.addEventListener("scroll", checkScrollPosition);
    return () => {
      container.removeEventListener("scroll", checkScrollPosition);
    };
  }, [checkScrollPosition]);

  // Effect to scroll to bottom when allMessages change
  useEffect(() => {
    const lastMessage = messageContainerRef.current.lastElementChild;
    if (lastMessage) {
      lastMessage.scrollIntoView();
    }
    setScrolledToBottom(true);
  }, [allMessages]);

  // Function to smooth scroll to the bottom of the message container
  const smoothScrollToBottom = () => {
    const lastElement = messageContainerRef.current.lastElementChild;
    const penultimateElement = lastElement
      ? lastElement.previousElementSibling
      : null;

    if (penultimateElement) {
      penultimateElement.scrollIntoView({ behavior: "smooth" });
    }

    setScrolledToBottom(true);
  };

  // Function to handle the "scroll to bottom" button click
  const handleScrollToBottomClick = useCallback(() => {
    smoothScrollToBottom();
    scrollToBottomButtonRef.current.blur();
  }, [smoothScrollToBottom]);

  // Memoize the "Scroll to Bottom" button component
  const scrollToBottomButton = useMemo(
    () =>
      !scrolledToBottom && (
        <ScrollToBottomButton
          title="Scroll to bottom"
          ref={scrollToBottomButtonRef}
          onClick={handleScrollToBottomClick}
        >
          <MdKeyboardDoubleArrowDown />
        </ScrollToBottomButton>
      ),
    [scrolledToBottom, handleScrollToBottomClick]
  );

  return scrollToBottomButton;
};

export default ScrollToBottom;
