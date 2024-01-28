import styled from "styled-components";

export const MessageContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const ProfilePic = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
`;

export const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: fit-content;
  padding: 4px 10px;
  font-size: calc(0.8rem + 0.2vw);
  border: 1px solid #dfedec;
  background: #dfedec;
  text-align: ${(props) => (props.msgbyme === "true" ? "right" : "left")};
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

  small {
    font-size: calc(0.5rem + 0.1vw);
  }
`;
