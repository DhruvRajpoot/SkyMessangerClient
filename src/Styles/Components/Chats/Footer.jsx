import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  align-items: center;
  background: #b6b6b6;
  gap: 0.5rem;
  padding: 5px 15px;
  position: relative;
`;

export const EmojiButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  border-radius: 50%;
  padding: 1px;
  margin-left: 5px;
  background: #8c8c8c;
  color: #3f3f3f;
  cursor: pointer;

  &:hover {
  }
`;

export const EmojiPicker = styled.div`
  position: absolute;
  left: 5px;
  transition: all 0.2s ease-in-out;
  bottom: ${(props) => (props.showemojipicker === "true" ? "55px" : "0px")};
  opacity: ${(props) => (props.showemojipicker === "true" ? "1" : "0")};
  visibility: ${(props) =>
    props.showemojipicker === "true" ? "visible" : "hidden"};
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: calc(0.9rem + 0.1vw);
  background: transparent;
  border: none;
  margin-left: 10px;

  &:focus {
    outline: none;
  }
`;

export const SendButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  padding: 10px;
  font-size: calc(0.9rem + 0.1vw);
  transition: all 0.2s ease-in-out;
  color: black;
  background: #a8a8a8;
  cursor: pointer;

  &:active {
    transform: scale(0.95);
  }
`;
