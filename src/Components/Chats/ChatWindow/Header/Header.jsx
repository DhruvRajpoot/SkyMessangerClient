import React, { useRef, useState } from "react";
import {
  HeaderContainer,
  LeftContainer,
  MenuButton,
  ProfilePicContainer,
  TextDataContainer,
} from "../../../../Styles/Components/Chats/ChatWindow/Header/Header";
import { ProfilePic } from "../../../../Styles/Components/Chats/Sidebar/ProfilePicComponent";
import { formateDateAndTime } from "../../../../Utils/common";
import { RiMenu3Fill } from "react-icons/ri";
import UserDetailsMenu from "./UserDetailsMenu";
import FullscreenView from "../../FullscreenView";

const Header = (props) => {
  const { activeConversationUser, activeConversationUserLastSeen, isTyping } =
    props;

  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showFullscreenView, setShowFullscreenView] = useState(false);

  const leftContainerRef = useRef(null);

  return (
    <HeaderContainer>
      <LeftContainer
        onClick={() => {
          setShowUserDetails(!showUserDetails);
        }}
        ref={leftContainerRef}
      >
        <ProfilePicContainer>
          {activeConversationUser?.profileInfo?.pic !== null ? (
            <ProfilePic
              src={activeConversationUser?.profileInfo?.pic}
              title="Fullscreen View"
            />
          ) : (
            activeConversationUser?.fullname[0]
          )}
        </ProfilePicContainer>

        <TextDataContainer>
          {/* <h3>{activeConversationUser.email}</h3> */}
          <h3>{activeConversationUser.fullname}</h3>
          <p>
            {isTyping
              ? "Typing..."
              : activeConversationUserLastSeen &&
                (activeConversationUserLastSeen === "Online"
                  ? "Online"
                  : `Last seen ${formateDateAndTime(
                      activeConversationUserLastSeen
                    )}`)}
          </p>
        </TextDataContainer>

        {showUserDetails && (
          <UserDetailsMenu
            activeConversationUser={activeConversationUser}
            showUserDetails={showUserDetails}
            setShowUserDetails={setShowUserDetails}
            leftContainerRef={leftContainerRef}
            setShowFullscreenView={setShowFullscreenView}
          />
        )}
      </LeftContainer>

      {showFullscreenView && activeConversationUser?.profileInfo?.pic && (
        <FullscreenView
          show={showFullscreenView}
          setShow={setShowFullscreenView}
          activeConversationUser={activeConversationUser}
          forProfilePic={true}
        />
      )}

      <MenuButton>
        <RiMenu3Fill />
      </MenuButton>
    </HeaderContainer>
  );
};

export default Header;
