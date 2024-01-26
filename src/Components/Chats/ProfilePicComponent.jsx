import React, { useContext, useState } from "react";
import {
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

export const ProfilePicComponent = () => {
  const { loggedInUser } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleViewProfile = () => {
    setIsMenuOpen(false);
  };

  const handleChangeProfile = () => {
    setIsMenuOpen(false);
  };

  const handleRemoveProfile = () => {
    setIsMenuOpen(false);
  };

  return (
    <ProfilePicContainer>
      <ProfilePic src={loggedInUser?.profileInfo?.pic} />
      <ProfilePicHover
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
      >
        <MdAddPhotoAlternate />
      </ProfilePicHover>

      <ProfilePicMenu isMenuOpen={isMenuOpen}>
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
