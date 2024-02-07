import styled from "styled-components";

export const FullscreenViewContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgb(75, 75, 75);
  color: aliceblue;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: calc(1rem + 2vw);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 201;
`;

export const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1.5rem;
  background-color: #323232;
  color: whitesmoke;
  width: 100%;
  padding: 7px 15px;
`;

export const Title = styled.p`
  font-size: 0.9rem;
  margin-right: auto;
`;

export const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  border-radius: 5px;
  padding: 7px;
  transition: all 0.1s ease-in-out;
  cursor: pointer;

  &:hover {
    background: ${({ background }) =>
      background ? background : "rgba(255, 255, 255, 0.1)"};
  }
`;

export const FullscreenImage = styled.img`
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
  animation: fadeIn 0.25s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.5) translateY(100%);
    }

    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
`;
