import React, { useContext } from "react";
import MyContext from "../Context/MyContext";
import {
  ToastContainer,
  ToastWrapper,
  ToastHeading,
  ToastMessage,
  ToastSideBar,
} from "../Styles/Components/Toast";

export const Toast = () => {
  const { showState, toastType, toastMessage } = useContext(MyContext);

  return (
    <ToastContainer showState={showState}>
      <ToastWrapper>
        <ToastSideBar type={toastType} />
        <ToastHeading type={toastType}>{toastType}</ToastHeading>
        <ToastMessage>{toastMessage}</ToastMessage>
      </ToastWrapper>
    </ToastContainer>
  );
};
