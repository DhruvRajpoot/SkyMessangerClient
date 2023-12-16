import styled from "styled-components";

export const MessangerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  border: 1px solid black;
  width: fit-content;
  padding: 4px 10px;
  font-size: calc(0.8rem + 0.2vw);
  margin-left: ${(props) => (props.msgByMe ? "auto" : "0")};
  text-align: ${(props) => (props.msgByMe ? "right" : "left")};
  border-radius: ${(props) =>
    props.msgByMe ? "10px 0 10px 10px" : "0 10px 10px 10px"};

  small {
    font-size: calc(0.5rem + 0.1vw);
  }
`;
