import styled from "styled-components";

export const ChatWindowContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const Header = styled.div`
  display: flex;
  gap: 1rem;
  background: #b6b6b6;
`;

export const LeftContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: gray;
`;

export const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  gap: 1rem;
  height: 100%;
  padding: 1rem 0.5rem;
  max-height: 75vh;
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
  `;
