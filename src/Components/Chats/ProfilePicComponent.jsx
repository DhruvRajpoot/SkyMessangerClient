import React, { useContext, useEffect, useRef, useState } from "react";
import {
  DefaultProfilePic,
  ImageInput,
  ProfilePic,
  ProfilePicContainer,
  ProfilePicHover,
  Menu,
  MenuItem,
  UploadButton,
  CancelButton,
  LoadingContainer,
} from "../../Styles/Components/Chats/ProfilePicComponent";
import {
  MdAddAPhoto,
  MdAddPhotoAlternate,
  MdOutlineNoPhotography,
  MdRemoveRedEye,
} from "react-icons/md";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import UserContext from "../../Context/UserContext";
import useOutsideClick from "../../Utils/useOutsideClick";
import useAxios from "../../Utils/useAxios";
import MyContext from "../../Context/MyContext";
import { uploadFile } from "../../Utils/Cloudinary";
import { Loading } from "../Loading/Loading";

export const ProfilePicComponent = () => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const { handleError, showToastMessage } = useContext(MyContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const profilePicHoverRef = useRef(null);
  const profilePicMenuRef = useRef(null);
  const imageInputRef = useRef(null);
  const api = useAxios();
  const [loading, setLoading] = useState(false);

  const [profilePic, setProfilePic] = useState(loggedInUser?.profileInfo?.pic);
  const [selectedPic, setSelectedPic] = useState(null);

  useEffect(() => {
    setProfilePic(loggedInUser?.profileInfo?.pic);
  }, [loggedInUser]);

  // Update profile pic locally across the app after uploading
  const updateProfilePicOnApp = (imageUrl) => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...loggedInUser,
        profileInfo: {
          ...loggedInUser.profileInfo,
          pic: imageUrl,
        },
      })
    );

    setLoggedInUser({
      ...loggedInUser,
      profileInfo: {
        ...loggedInUser.profileInfo,
        pic: imageUrl,
      },
    });
  };

  // Upload profile pic to the server
  const uploadProfilePicToServer = async (pic, oldPic) => {
    try {
      const response = await api.put(`/user/updateprofilepic`, {
        pic: pic,
        oldPic: oldPic,
      });

      if (response.status === 200) {
        updateProfilePicOnApp(response.data.pic);
        showToastMessage("Success", "Profile Pic Updated");
      }
    } catch (err) {
      handleError(err);
    }
  };

  // View Profile Pic
  const handleViewProfile = (e) => {
    setIsMenuOpen(false);
    e.stopPropagation();
  };

  // Open image input on click on upload image
  const handleImageInputClick = (e) => {
    e.stopPropagation();
    setIsMenuOpen(false);
    imageInputRef.current.click();
  };

  // Handle click on upload button
  const handleChangeProfile = async (e) => {
    e.stopPropagation();
    setLoading(true);

    try {
      if (selectedPic === null) return;

      const data = await uploadFile(
        selectedPic,
        "image",
        "high_res_image_preset"
      );

      const high_res_url = data.secure_url;

      await uploadProfilePicToServer(high_res_url, profilePic);

      setSelectedPic(null);
    } catch (err) {
      handleError(err);
    }

    setLoading(false);
  };

  // Handle click on remove profile pic
  const handleRemoveProfile = async (e) => {
    e.stopPropagation();
    setIsMenuOpen(false);
    setLoading(true);

    await uploadProfilePicToServer(null, profilePic);

    setLoading(false);
  };

  // close profile pic menu on outside click
  useOutsideClick(profilePicMenuRef, () => setIsMenuOpen(false), isMenuOpen, [
    profilePicHoverRef,
  ]);

  return (
    <ProfilePicContainer>
      {selectedPic !== null ? (
        <ProfilePic src={URL.createObjectURL(selectedPic)} />
      ) : profilePic !== null ? (
        <ProfilePic src={profilePic} />
      ) : (
        <DefaultProfilePic>{loggedInUser?.fullname[0]}</DefaultProfilePic>
      )}

      {selectedPic === null && (
        <ProfilePicHover
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
          ref={profilePicHoverRef}
        >
          <MdAddPhotoAlternate />
        </ProfilePicHover>
      )}

      {loading && (
        <LoadingContainer>
          <Loading width={100} height={100} />
        </LoadingContainer>
      )}

      <Menu ismenuopen={isMenuOpen.toString()} ref={profilePicMenuRef}>
        {profilePic !== null && (
          <MenuItem onClick={handleViewProfile}>
            <MdRemoveRedEye />
            <span>View image</span>
          </MenuItem>
        )}

        <MenuItem onClick={handleImageInputClick}>
          <MdAddAPhoto />
          <span>{profilePic !== null ? "Change image" : "Upload image"}</span>
          <ImageInput
            type="file"
            accept="image/*"
            ref={imageInputRef}
            value={""}
            onChange={(e) => setSelectedPic(e.target.files[0])}
          />
        </MenuItem>

        {profilePic !== null && (
          <MenuItem onClick={handleRemoveProfile}>
            <MdOutlineNoPhotography />
            <span>Remove image</span>
          </MenuItem>
        )}
      </Menu>

      {selectedPic !== null && !loading && (
        <CancelButton
          onClick={(e) => {
            setSelectedPic(null);
            e.stopPropagation();
          }}
          title="Cancel"
        >
          <RxCross2 />
        </CancelButton>
      )}

      {selectedPic !== null && !loading && (
        <UploadButton onClick={handleChangeProfile} title="Upload">
          <RiUploadCloud2Fill />
        </UploadButton>
      )}
    </ProfilePicContainer>
  );
};
