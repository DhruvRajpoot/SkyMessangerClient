import styled from "styled-components";

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ChatWrapper = styled.div`
  display: flex;
  height: 100vh; // Make the chat window take up the entire screen // *** Important //
`;

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 1rem;
  padding: 0.5rem 0.3rem;
  background: #6b6b6b;
  max-width: 100px;
  z-index: 200;
  position: relative;
`;

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.5rem 1rem;
  background: lightgray;
  width: 100%;
  max-width: 400px;
`;

export const RightContainer = styled.div`
  background: #979797;
  width: 100%;
`;

export const ProfilePic = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid black;
  cursor: pointer;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
`;

export const UsersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
