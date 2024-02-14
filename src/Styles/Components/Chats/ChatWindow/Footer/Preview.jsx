import styled from "styled-components";

export const PreviewContainer = styled.div`
  max-width: 70%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 8px;
  border-radius: 5px;
  background: #f1f1f1;
  position: absolute;
  left: 12%;
  bottom: 60px;
  z-index: 148;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const CloseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #d1d1d1;
  color: #3f3f3f;
  padding: 1px;
  border: none;
  border-radius: 50%;
  margin-left: auto;
  font-size: 1.3rem;
  cursor: pointer;
`;

export const PreviewImageContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  img,
  video,
  iframe {
    max-width: 100%;
    max-height: 100%;
    border-radius: 5px;
    object-fit: cover;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 5rem;
  border-radius: 5px;
  background: #fff;

  span {
    font-size: 5rem;
  }

  p {
    font-size: 1.2rem;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 5px;
`;
