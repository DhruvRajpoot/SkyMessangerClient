import styled from "styled-components";

// Variables
export const PrimaryColor = "#56b2bc";
export const SecondaryColor = "#3d7d84";
export const WhiteColor = "#fff";
export const BlackColor = "#000";

// Styled Components
export const PrimaryButton = styled.button`
  width: ${(props) => props.width || "auto"};
  background-color: ${PrimaryColor};
  color: white;
  font-size: ${(props) => props.fontsize || "1rem"};
  font-weight: 400;
  line-height: 1.5;
  padding: ${(props) => props.padding || "0.375rem 0.75rem"};
  margin: ${(props) => props.margin || "0"};
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    background-color: ${SecondaryColor};
    cursor: not-allowed;
  }
`;

export const SecondaryButton = styled.button`
  width: ${(props) => props.width || "auto"};
  background-color: transparent;
  color: ${PrimaryColor};
  font-size: ${(props) => props.fontsize || "1rem"};
  font-weight: 400;
  line-height: 1.5;
  padding: 0.375rem 0.75rem;
  outline: none;
  border: 1px solid ${PrimaryColor};
  border-radius: 10px;
  transition: all 0.15s ease-in-out;
  cursor: pointer;

  &:hover {
    border: 1px solid ${SecondaryColor};
    color: white;
  }

  &:active {
    transform: scale(0.96);
  }

  &:disabled {
    opacity: 0.5;
    background-color: ${SecondaryColor};
    cursor: not-allowed;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  position: relative;

  label {
    font-weight: 500;
  }

  input {
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    border-radius: 0.25rem;
    border: 1px solid #ced4da;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
`;
