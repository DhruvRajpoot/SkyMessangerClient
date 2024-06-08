import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  align-items: flex-end;
  background: #b6b6b6;
  padding: 8px 15px 10px 15px;
  border-radius: 10px 10px 0 0;
  position: relative;
`;

export const EmojiButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  padding: 5px;
  border-radius: 5px;
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
  transition: all 0.15s ease-in-out;
  bottom: ${(props) => (props.showemojipicker === "true" ? "60px" : "0px")};
  opacity: ${(props) => (props.showemojipicker === "true" ? "1" : "0")};
  visibility: ${(props) =>
    props.showemojipicker === "true" ? "visible" : "hidden"};
  z-index: 149;
`;

export const AttachButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.1rem;
  padding: 8px;
  margin-left: 10px;
  color: #1c1c1c;
  background: #8c8c8c;
  border-radius: 5px;
  border: none;
  position: relative;
  cursor: pointer;
`;

export const TextInput = styled.textarea`
  width: 100%;
  padding: 10px;
  font-size: calc(0.9rem + 0.1vw);
  background: transparent;
  border: none;
  margin-inline: 10px;
  resize: none;
  height: ${(props) => props.textareaheight}px;
  max-height: 200px;
  border: 1px solid black;

  &:focus {
    outline: none;
  }
`;

export const SendButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border-radius: 5px;
  font-size: calc(0.9rem + 0.1vw);
  transition: all 0.2s ease-in-out;
  color: black;
  background: #a8a8a8;
  cursor: pointer;

  &:active {
    transform: scale(0.95);
  }
`;
