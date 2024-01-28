import React, { useContext, useRef, useState } from "react";
import {
  DefaultProfilePic,
  ProfilePic,
  ProfilePicContainer,
  ProfilePicHover,
  ProfilePicMenu,
  ProfilePicMenuItem,
} from "../../Styles/Components/Chats/ProfilePicComponent";
import {
  MdAddAPhoto,
  MdAddPhotoAlternate,
  MdEdit,
  MdOutlineNoPhotography,
  MdRemoveRedEye,
} from "react-icons/md";
import UserContext from "../../Context/UserContext";
import useOutsideClick from "../../Utils/useOutsideClick";

export const ProfilePicComponent = () => {
  const { loggedInUser } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const profilePicHoverRef = useRef(null);
  const profilePicMenuRef = useRef(null);

  const handleViewProfile = () => {
    setIsMenuOpen(false);
  };

  const handleChangeProfile = () => {
    setIsMenuOpen(false);
  };

  const handleRemoveProfile = () => {
    setIsMenuOpen(false);
  };

  // close profile pic menu on outside click
  useOutsideClick(profilePicMenuRef, () => setIsMenuOpen(false), [
    profilePicHoverRef,
  ]);

  return (
    <ProfilePicContainer>
      {loggedInUser?.profileInfo?.pic !== null ? (
        <ProfilePic src={loggedInUser?.profileInfo?.pic} />
      ) : (
        <DefaultProfilePic>{loggedInUser?.fullname[0]}</DefaultProfilePic>
      )}
      <ProfilePicHover
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
        ref={profilePicHoverRef}
      >
        <MdAddPhotoAlternate />
      </ProfilePicHover>

      <ProfilePicMenu ismenuopen={isMenuOpen.toString()} ref={profilePicMenuRef}>
        <ProfilePicMenuItem onClick={handleViewProfile}>
          <MdRemoveRedEye />
          <span>View image</span>
        </ProfilePicMenuItem>
        <ProfilePicMenuItem onClick={handleChangeProfile}>
          <MdAddAPhoto />
          <span>Change image</span>
        </ProfilePicMenuItem>
        <ProfilePicMenuItem onClick={handleRemoveProfile}>
          <MdOutlineNoPhotography />
          <span>Remove image</span>
        </ProfilePicMenuItem>
      </ProfilePicMenu>
    </ProfilePicContainer>
  );
};
