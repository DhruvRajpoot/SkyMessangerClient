import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #b6b6b6;
  gap: 0.5rem;

  input {
    width: 100%;
    border: 1px solid black;
    border-radius: 20px;
    padding: 10px;
    font-size: calc(0.9rem + 0.1vw);
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    border-radius: 50%;
    padding: 10px;
    font-size: calc(0.9rem + 0.1vw);
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    color: black;

    &:active {
      transform: scale(0.95);
    }
  }
`;
