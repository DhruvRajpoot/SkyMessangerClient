import React from "react";
import Lottie from "react-lottie";
import LoadingData from "../../Assets/Loading/Loading.json";
import styled from "styled-components";

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Loading = (props) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <LoadingContainer>
      <Lottie
        options={defaultOptions}
        width={props.width ?? 200}
        height={props.height ?? 200}
      />
    </LoadingContainer>
  );
};
