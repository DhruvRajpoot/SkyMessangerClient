import styled from "styled-components";

export const UserTileContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  border: 1px solid black;
  background-color: #c2c2c2;

  &:hover {
    background-color: #a2a2a2;
  }
`;

export const LeftContainer = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: gray;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;

  * {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  img {
    object-fit: cover;
  }
`;

export const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const OnlineIndicator = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${(props) =>
    props.useronline == "true" ? "#01e901" : "#de0404"};
`;
