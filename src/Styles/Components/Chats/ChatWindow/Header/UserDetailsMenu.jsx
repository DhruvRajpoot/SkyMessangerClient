import styled from "styled-components";

export const UserDetailsMenuContainer = styled.div`
  position: absolute;
  top: 0px;
  left: 10px;
  width: fit-content;
  height: fit-content;
  min-width: 300px;
  max-width: 100%;
  background: #f0f0f0;
  box-shadow: 0 0 5px 0 #00000053;
  border-radius: 5px;
  padding: 15px 30px 15px 15px;
  z-index: 100;
  animation: slideDown 0.3s forwards;
  cursor: auto;

  @keyframes slideDown {
    from {
      transform: translateY(-15px);
      opacity: 0;
    }
    to {
      transform: translateY(8px);
      opacity: 1;
    }
  }
`;

export const ProfilePicContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: gray;
  font-size: 3rem;
`;

export const ProfilePic = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;

  * {
    user-select: text;
  }
`;

export const Title = styled.h3`
  font-size: 1rem;
  margin-bottom: 5px;
  color: #00000099;
`;

export const Value = styled.p`
  font-size: 1.2rem;
  color: #000000;
`;
