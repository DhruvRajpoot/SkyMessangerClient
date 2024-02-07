import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 10px;
  background: #b6b6b6;
  position: relative;
`;

export const LeftContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

export const ProfilePicContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: gray;
  font-size: 1.5rem;
`;

export const TextDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const MenuButton = styled.button`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-left: auto;
  font-size: 1.5rem;
  padding-block: 5px;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
`;
