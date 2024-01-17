import React from "react";
import { SideDrawerContainer } from "../../Styles/Components/Chats/SideDrawer";

export const SideDrawer = (props) => {
  return (
    <SideDrawerContainer isOpen={props.isOpen}>
      <a href="/">Users</a>
    </SideDrawerContainer>
  );
};
