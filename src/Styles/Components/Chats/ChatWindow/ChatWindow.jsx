import styled from "styled-components";

export const ChatWindowContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  gap: 1rem;
  height: 100%;
  padding: 1rem 0.5rem 0.5rem 0.5rem;
  position: relative;

  * {
    user-select: text;
  }
`;

export const DateBlock = styled.div`
  width: fit-content;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  font-size: calc(0.6rem + 0.2vw);
  padding: 7px 10px;
  border-radius: 0.5rem;
  background-color: #dffca3;
  margin-bottom: 1rem;
  user-select: none;
`;

export const TypingLoader = styled.div`
  display: flex;
  justify-content: flex-start;
  width: fit-content;
  height: fit-content;
`;

export const ScrollToBottomButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 4rem;
  right: 12px;
  background-color: #ababab;
  color: #050505;
  font-size: 1.5rem;
  padding: 5px;
  border-radius: 50%;
  border: none;
  border: 1px solid #3e3e3e;
  z-index: 100;
  cursor: pointer;

  &:hover {
    background-color: #9c9c9c;
  }
`;
