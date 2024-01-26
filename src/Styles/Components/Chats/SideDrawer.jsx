import styled from "styled-components";

export const SideDrawerContainer = styled.div`
  width: 100%;
  min-width: 400px;
  height: 100%;
  background: #ffffff;
  border: 1px solid black;
  position: absolute;
  z-index: 100;
  top: 0;
  left: ${(props) => (props.isopen === "true" ? "100%" : "-100%")};
  opacity: ${(props) => (props.isopen === "true" ? 1 : 0)};
  visibility: ${(props) => (props.isopen === "true" ? "visible" : "hidden")};
  transition: all 0.2s ease-out;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0;
  }
`;

export const SideDrawerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding-top: 50px;
  width: 100%;
  height: 100%;
`;

export const Heading = styled.h1`
  font-size: 1.5rem;
`;

export const ProfileTextContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: .5rem;
`;

export const Label = styled.label`
  font-size: 1rem;
  font-weight: 500;
  color: #000000;
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const Input = styled.input`
  width: 100%;
  height: 2rem;
  border: 1px solid #000000;
  border-radius: 0.5rem;
  padding: 0.5rem;
  transition: all 0.2s ease-out;
  outline: ${(props) => (props.iseditable === "true" ? "auto" : "none")};
`;

export const EditButton = styled.button`
  position: absolute;
  top: 7px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1rem;
  color: #000000;
  cursor: pointer;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-left: auto;
`;
