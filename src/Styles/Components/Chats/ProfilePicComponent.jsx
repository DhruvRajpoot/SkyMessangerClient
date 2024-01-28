import styled from "styled-components";

export const ProfilePicContainer = styled.div`
  min-width: 150px;
  min-height: 150px;
  max-width: 150px;
  max-height: 150px;
  border-radius: 50%;
  position: relative;
  border: 1px solid black;
`;

export const ProfilePicHover = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  color: rgba(255, 255, 255, 0.8);
  font-size: 2rem;
  opacity: 0;
  transition: all 0.2s ease-out;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

export const DefaultProfilePic = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: gray;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
`;

export const ProfilePic = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

export const ProfilePicMenu = styled.div`
  width: 100%;
  position: absolute;
  top: 105%;
  left: 50%;
  z-index: 150;
  transform: translateX(-50%);
  background: white;
  border-radius: 5px;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.3);
  display: ${({ ismenuopen }) => (ismenuopen === "true" ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  padding: 5px;
`;

export const ProfilePicMenuItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  padding: 8px 5px 8px 10px;
  border-radius: 3px;
  transition: all 0.15s ease-out;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;
