import styled from "styled-components";

export const MessageContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  * {
    user-select: none;
  }
`;

export const ProfilePicContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  font-size: 1.2rem;
  border-radius: 50%;
  background: #97e3d7;
`;

export const ProfilePic = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;

  * {
    user-select: none;
  }
`;

export const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: fit-content;
  height: auto;
  word-break: break-all;
  max-width: calc(max(60%, 200px));
  padding: 5px 10px;
  font-size: calc(0.8rem + 0.2vw);
  border: 1px solid #dfedec;
  background: #dfedec;
  position: relative;
  border-radius: ${(props) =>
    props.msgbyme === "true" ? "10px 0 10px 10px" : "0 10px 10px 10px"};
  box-shadow: ${(props) =>
    props.msgbyme === "true"
      ? "-2px 1px 1px 1px #dfedec"
      : "2px 1px 1px 1px #dfedec"};
  margin-left: ${(props) =>
    props.msgbyme === "true"
      ? "auto"
      : props.showprofile === "true"
      ? "0"
      : "45px"};

  img,
  video,
  iframe {
    width: 100%;
    height: 100%;
    max-width: 400px;
    max-height: 400px;
    background: #f1f1f1;
    border-radius: ${(props) =>
      props.msgbyme === "true" ? "10px 0 10px 10px" : "0 10px 10px 10px"};
    object-fit: cover;
    margin-top: 3px;
    margin-bottom: 5px;
    cursor: pointer;
  }
`;

export const Text = styled.p`
  * {
    user-select: text;
  }
`;

export const Small = styled.small`
  font-size: calc(0.5rem + 0.1vw);
  user-select: none;
  text-align: ${(props) => (props.msgbyme === "true" ? "right" : "left")};
`;

export const MessageMenuBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 100%;
  position: absolute;
  top: 0;
  right: ${(props) => (props.msgbyme === "true" ? "auto" : "-42px")};
  left: ${(props) => (props.msgbyme === "true" ? "-42px" : "auto")};
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(10px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    width: fit-content;
    padding: 4px;
    border-radius: 50%;
    border: 1px solid #4b4b4b;
    background-color: #939393;
    cursor: pointer;

    &:hover {
      color: #000;
      background-color: #6e6e6e;
    }

    &:active {
      transform: scale(0.9);
    }
  }
`;

export const MessageMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 4px;
  background: #cbcbcb;
  border: 1px solid #dfedec;
  border-radius: 5px;
  position: absolute;
  top: calc(50% + 25px);
  transform: translateY(-50%);
  left: ${(props) => (props.msgbyme === "true" ? "-8.5rem" : "auto")};
  right: ${(props) => (props.msgbyme === "true" ? "auto" : "-8.5rem")};
  z-index: 10;
  animation: slideDown 0.15s ease-in-out forwards;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-60%);
    }
    to {
      opacity: 1;
      transform: translateY(-50%);
    }
  }

  span {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.9rem;
    padding: 8px 10px;
    border: none;
    border-radius: 5px;
    transition: all 0.15s ease-in-out;
    cursor: pointer;

    &:hover {
      background: #f1f1f1;
    }
  }
`;

export const IconContainer = styled.div`
  max-width: 100%;
  display: flex;
  text-align: left;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.7rem;
  border-radius: 5px;
  background: #fff;
  cursor: pointer;

  &:active {
    background: #f1f1f1;
  }
`;

export const Icon = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  padding: 4px 1px;
  margin: 0;
  background-color: ${(props) => props.backgroundcolor || "#fff"};
  border: 1px solid ${(props) => props.backgroundcolor || "#fff"};
  border-radius: 5px;
  color: ${(props) => props.color || "#000"};
`;
