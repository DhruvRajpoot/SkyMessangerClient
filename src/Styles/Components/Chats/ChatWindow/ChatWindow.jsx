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
  padding: 1rem 0.5rem 0 0.5rem;

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
