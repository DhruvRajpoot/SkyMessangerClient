import styled from "styled-components";

export const UserTileContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  border: 1px solid black;
  background-color: #c2c2c2;
`;

export const LeftContainer = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: gray;
  display: flex;
  justify-content: center;
  align-items: center;
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
  background: ${(props) => (props.useronline == "true" ? "#01e901" : "#de0404")};
`;
