import React, { useRef, useState } from "react";
import {
  TextContainer,
  Title,
  UserDetailsMenuContainer,
  Value,
} from "../../Styles/Components/Chats/UserDetailsMenu";
import useOutsideClick from "../../Utils/useOutsideClick";
import { ProfilePicContainer } from "../../Styles/Components/Chats/UserDetailsMenu";
import { ProfilePic } from "../../Styles/Components/Chats/ProfilePicComponent";
import FullscreenView from "./FullscreenView";

const UserDetailsMenu = (props) => {
  const {
    activeConversationUser,
    showUserDetails,
    setShowUserDetails,
    leftContainerRef,
    setShowFullscreenView,
  } = props;

  const profilePic = activeConversationUser?.profileInfo?.pic;
  const userDetailsMenuRef = useRef(null);

  // Close user details menu on outside click
  useOutsideClick(
    userDetailsMenuRef,
    () => {
      setShowUserDetails(false);
    },
    showUserDetails,
    [leftContainerRef]
  );

  return (
    <UserDetailsMenuContainer
      ref={userDetailsMenuRef}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <ProfilePicContainer>
        {profilePic !== null ? (
          <ProfilePic
            src={profilePic}
            alt="Profile Pic"
            onClick={() => {
              setShowFullscreenView(true);
            }}
            title="Fullscreen View"
          />
        ) : (
          activeConversationUser?.fullname[0]
        )}
      </ProfilePicContainer>

      <TextContainer>
        <div>
          <Title>Fullname</Title>
          <Value>{activeConversationUser?.fullname}</Value>
        </div>

        <div>
          <Title>Email</Title>
          <Value>{activeConversationUser?.email}</Value>
        </div>

        <div>
          <Title>Bio</Title>
          <Value>{activeConversationUser?.profileInfo?.bio}</Value>
        </div>
      </TextContainer>
    </UserDetailsMenuContainer>
  );
};

export default UserDetailsMenu;
