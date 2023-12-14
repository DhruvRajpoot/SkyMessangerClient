import styled from "styled-components";

// Variables
export const PrimaryColor = "#56b2bc";
export const SecondaryColor = "#3d7d84";
export const WhiteColor = "#fff";
export const BlackColor = "#000";

// Styled Components
export const PrimaryButton = styled.button`
  background-color: ${PrimaryColor};
  color: ${SecondaryColor};
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 0.375rem 0.75rem;
  text-align: center;
  vertical-align: middle;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.15s ease-in-out;

  &:hover {
    background-color: #3e8e94;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.25rem rgba(86, 178, 188, 0.5);
  }

  &:disabled {
    opacity: 0.5;
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
