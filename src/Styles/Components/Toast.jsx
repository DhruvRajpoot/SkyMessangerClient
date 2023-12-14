import styled from "styled-components";

export const ToastContainer = styled.div`
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 10px;
  width: 100%;
  max-width: calc(min(100vw - 3rem, 400px));
  position: fixed;
  top: 2rem;
  right: 2vw;
  background-color: #fff;
  z-index: 999;
  animation: slideIn 0.3s ease-in-out;

  @keyframes slideIn {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(0%);
    }
  }
`;

export const ToastWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ToastSideBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 5px;
  border-radius: 10px;
  background-color: ${({ type }) =>
    type === "Success"
      ? "#0f0"
      : type === "Error"
      ? "#f00"
      : type === "Warning"
      ? "#ff0"
      : "#005a86"};
`;

export const ToastHeading = styled.h1`
  font-size: 1.2rem;
  font-weight: 500;
  margin-left: 1rem;
  color: ${({ type }) =>
    type === "Success"
      ? "#0f0"
      : type === "Error"
      ? "#f00"
      : type === "Warning"
      ? "#ff0"
      : "#005a86"};
`;

export const ToastMessage = styled.p`
  font-size: 1rem;
  font-weight: 500;
  margin-left: 1rem;
  color: "#262b2e";
`;
