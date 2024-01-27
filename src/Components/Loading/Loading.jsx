import React from "react";
import Lottie from "react-lottie";
import styled from "styled-components";
import LoadingData from "../../Assets/Loading/Loading.json";
import LoadingData2 from "../../Assets/Loading/Typing.json";

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Loading = (props) => {
  const getAnimationData = () => {
    switch (props.type) {
      case "typing":
        return LoadingData2;
      default:
        return LoadingData;
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: getAnimationData(),
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
