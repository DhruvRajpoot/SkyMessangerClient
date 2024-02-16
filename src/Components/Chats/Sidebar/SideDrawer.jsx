import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Input,
  Label,
  SideDrawerContainer,
  SideDrawerWrapper,
  Heading,
  ProfileTextContainer,
  InputContainer,
  EditButton,
  SaveButton,
} from "../../../Styles/Components/Chats/Sidebar/SideDrawer";
import UserContext from "../../../Context/UserContext";
import useAxios from "../../../Utils/useAxios";
import MyContext from "../../../Context/MyContext";
import { MdEdit, MdOutlineCancel } from "react-icons/md";
import { ProfilePicComponent } from "./ProfilePicComponent";
import useOutsideClick from "../../../Utils/useOutsideClick";
import LoadingGif from "../../../Assets/Loading/Loading2.gif";

export const SideDrawer = (props) => {
  const api = useAxios();
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const sideDrawerRef = useRef(null);
  const { showToastMessage } = useContext(MyContext);

  const [fullname, setFullname] = useState(loggedInUser?.fullname);
  const [bio, setBio] = useState(loggedInUser?.profileInfo?.bio);
  const [email, setEmail] = useState(loggedInUser?.email);

  const fullNameContainerRef = useRef(null);
  const bioContainerRef = useRef(null);

  useEffect(() => {
    setFullname(loggedInUser?.fullname);
    setBio(loggedInUser?.profileInfo?.bio);
    setEmail(loggedInUser?.email);
  }, [loggedInUser]);

  const [isFullNameEdit, setIsFullNameEdit] = useState(false);
  const [fullNameBtnLoading, setFullNameBtnLoading] = useState(false);
  const [isBioEdit, setIsBioEdit] = useState(false);
  const [bioBtnLoading, setBioBtnLoading] = useState(false);

  const handleFullNameEditClick = (e) => {
    setFullname(loggedInUser?.fullname);
    setIsFullNameEdit(!isFullNameEdit);
    e.stopPropagation();
  };

  const handleBioEditClick = (e) => {
    setBio(loggedInUser?.profileInfo?.bio);
    setIsBioEdit(!isBioEdit);
    e.stopPropagation();
  };

  const handleFullNameSave = async (e) => {
    try {
      setFullNameBtnLoading(true);
      await api.put(`/user/updateuserinfo`, { fullname });

      const updatedUser = {
        ...loggedInUser,
        fullname: fullname,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setLoggedInUser(updatedUser);
      setIsFullNameEdit(false);
      setFullNameBtnLoading(false);
    } catch (err) {
      showToastMessage("Error", "Error while updating fullname");
      console.log(err);
    }
  };

  const handleBioSave = async (e) => {
    try {
      setBioBtnLoading(true);
      await api.put(`/user/updateuserinfo`, { bio });

      const updatedUser = {
        ...loggedInUser,
        profileInfo: {
          ...loggedInUser.profileInfo,
          bio: bio,
        },
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setLoggedInUser(updatedUser);
      setIsBioEdit(false);
      setBioBtnLoading(false);
    } catch (err) {
      showToastMessage("Error", "Error while updating bio");
      console.log(err);
    }
  };

  // Cancel the edit mode when clicked outside fullNameContainer
  useOutsideClick(
    fullNameContainerRef,
    handleFullNameEditClick,
    isFullNameEdit
  );

  // Cancel the edit mode when clicked outside bioContainer
  useOutsideClick(bioContainerRef, handleBioEditClick, isBioEdit);

  // When the side drawer is opened, reset the scrollTop to 0
  useEffect(() => {
    if (props.isOpen && sideDrawerRef.current) {
      sideDrawerRef.current.scrollTop = 0;
    }
  }, [props.isOpen]);

  // Close the side drawer when clicked outside
  useOutsideClick(
    sideDrawerRef,
    () => props.setIsOpen(false),
    props.isOpen,
    props.excludeRefs
  );

  return (
    <SideDrawerContainer isopen={props.isOpen.toString()} ref={sideDrawerRef}>
      <SideDrawerWrapper>
        <Heading>My account</Heading>

        <ProfilePicComponent />

        <ProfileTextContainer ref={fullNameContainerRef}>
          <Label htmlFor="fullname">Full Name</Label>
          <InputContainer>
            <Input
              type="text"
              name="fullname"
              value={fullname || ""}
              readOnly={!isFullNameEdit}
              onChange={(e) => setFullname(e.target.value)}
              iseditable={isFullNameEdit.toString()}
            />

            <EditButton
              title={isFullNameEdit ? "Cancel" : "Edit"}
              onClick={handleFullNameEditClick}
            >
              {isFullNameEdit ? <MdOutlineCancel /> : <MdEdit />}
            </EditButton>
          </InputContainer>

          {isFullNameEdit && (
            <SaveButton
              onClick={handleFullNameSave}
              disabled={
                fullNameBtnLoading || fullname === loggedInUser?.fullname
              }
            >
              {fullNameBtnLoading ? (
                <img src={LoadingGif} alt="loading" loading="lazy" />
              ) : (
                "Save"
              )}
            </SaveButton>
          )}
        </ProfileTextContainer>

        <ProfileTextContainer ref={bioContainerRef}>
          <Label htmlFor="bio">Bio</Label>
          <InputContainer>
            <Input
              type="text"
              name="bio"
              value={bio || ""}
              readOnly={!isBioEdit}
              onChange={(e) => setBio(e.target.value)}
              iseditable={isBioEdit.toString()}
            />

            <EditButton
              title={isBioEdit ? "Cancel" : "Edit"}
              onClick={handleBioEditClick}
            >
              {isBioEdit ? <MdOutlineCancel /> : <MdEdit />}
            </EditButton>
          </InputContainer>

          {isBioEdit && (
            <SaveButton
              onClick={handleBioSave}
              disabled={bioBtnLoading || bio === loggedInUser?.profileInfo?.bio}
            >
              {bioBtnLoading ? (
                <img src={LoadingGif} alt="loading" loading="lazy" />
              ) : (
                "Save"
              )}
            </SaveButton>
          )}
        </ProfileTextContainer>

        <ProfileTextContainer>
          <Label>Email</Label>
          <Input type="text" value={email || ""} readOnly />
          <br />
        </ProfileTextContainer>
      </SideDrawerWrapper>
    </SideDrawerContainer>
  );
};
