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
  left: ${(props) => (props.isOpen ? "100%" : "-100%")};
  transition: all 0.3s ease-out;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
`;
