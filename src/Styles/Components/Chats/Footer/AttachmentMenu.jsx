import styled from "styled-components";

export const AttachmentMenuContainer = styled.div`
  width: 157px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 5px;
  background: white;
  color: #3f3f3f;
  box-shadow: 1px 1px 8px 0px #727272;
  border-radius: 5px;
  position: absolute;
  z-index: 149;
  left: 0px;
  transition: all 0.15s ease-in-out;
  bottom: ${(props) => (props.showattachmenu === "true" ? "50px" : "0px")};
  opacity: ${(props) => (props.showattachmenu === "true" ? "1" : "0")};
  visibility: ${(props) =>
    props.showattachmenu === "true" ? "visible" : "hidden"};

  div {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 7px 15px 7px 10px;
    border-radius: 5px;
    transition: all 0.05s ease-in-out;
    color: black;
    cursor: pointer;

    &:hover {
      background: #f1f1f1;
    }

    span {
      font-size: 0.95rem;
    }
  }
`;

export const HiddenInput = styled.input`
  display: none;
`;
