import styled from "styled-components";
import { PreviewContainer } from "./Preview";

export const LocationPreviewContainer = styled(PreviewContainer)`
  width: 100%;
  max-width: 80%;
  height: auto;
  left: 10%;
  box-shadow: 0px 1px 4px 1px #364343;
  animation: slideIn 0.3s ease-in-out;

  @keyframes slideIn {
    from {
      transform: translateY(10%);
    }
    to {
      transform: translateY(0);
    }
  }
`;

export const LocationPreviewMap = styled.div`
  width: calc(max(100%, 350px));
  height: 70vh;
  border: 1px solid #364343;
  z-index: 50;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  position: relative;
  z-index: 51;
`;

export const CurrentLocationButton = styled.button`
  position: absolute;
  bottom: 4.5rem;
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  padding: 0.8rem;
  border: none;
  border-radius: 50%;
  background: #59a3b6;
  color: #fff;
  cursor: pointer;

  &:hover {
    background: #007c9e;
  }
`;

export const SendLocationButton = styled.button`
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  background: #00a8ff;
  color: #fff;
  font-size: 0.8rem;
  cursor: pointer;

  &:hover {
    background: #007c9e;
  }

  &:disabled {
    background: #d1d1d1;
    color: #3f3f3f;
    cursor: auto;
  }
`;

export const SecondaryButton = styled(SendLocationButton)`
  background: none;
  color: #3f3f3f;
  border: 1px solid #3f3f3f;

  &:hover {
    background: #d5d5d5;
  }

  &:disabled {
    background: none;
    color: #aaaaaa;
    border: 1px solid #aaaaaa;
  }
`;
