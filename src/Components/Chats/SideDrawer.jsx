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
} from "../../Styles/Components/Chats/SideDrawer";
import UserContext from "../../Context/UserContext";
import { PrimaryButton } from "../../Styles/Common";
import useAxios from "../../Utils/useAxios";
import MyContext from "../../Context/MyContext";
import { MdEdit, MdOutlineCancel } from "react-icons/md";
import { ProfilePicComponent } from "./ProfilePicComponent";

export const SideDrawer = (props) => {
  const api = useAxios();
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const sideDrawerRef = useRef(null);
  const { showToastMessage } = useContext(MyContext);

  const [fullname, setFullname] = useState(loggedInUser?.fullname);
  const [bio, setBio] = useState(loggedInUser?.profileInfo?.bio);
  const [email, setEmail] = useState(loggedInUser?.email);

  useEffect(() => {
    setFullname(loggedInUser?.fullname);
    setBio(loggedInUser?.profileInfo?.bio);
    setEmail(loggedInUser?.email);
  }, [loggedInUser]);

  const [isFullNameEdit, setIsFullNameEdit] = useState(false);
  const [isBioEdit, setIsBioEdit] = useState(false);

  const handleFullNameEditClick = (e) => {
    setFullname(loggedInUser?.fullname);
    setIsFullNameEdit(!isFullNameEdit);
  };

  const handleBioEditClick = (e) => {
    setBio(loggedInUser?.profileInfo?.bio);
    setIsBioEdit(!isBioEdit);
  };

  const handleFullNameSave = async (e) => {
    try {
      await api.put(`/user/updateuserinfo`, { fullname });
      setIsFullNameEdit(false);

      const updatedUser = {
        ...loggedInUser,
        fullname: fullname,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setLoggedInUser(updatedUser);
    } catch (err) {
      showToastMessage("Error", "Error while updating fullname");
      console.log(err);
    }
  };

  const handleBioSave = async (e) => {
    try {
      await api.put(`/user/updateuserinfo`, { bio });
      setIsBioEdit(false);

      const updatedUser = {
        ...loggedInUser,
        profileInfo: {
          ...loggedInUser.profileInfo,
          bio: bio,
        },
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setLoggedInUser(updatedUser);
    } catch (err) {
      showToastMessage("Error", "Error while updating bio");
      console.log(err);
    }
  };

  // When the side drawer is opened, reset the scrollTop to 0
  useEffect(() => {
    if (props.isOpen && sideDrawerRef.current) {
      sideDrawerRef.current.scrollTop = 0;
    }
  }, [props.isOpen]);

  return (
    <SideDrawerContainer isopen={props.isOpen.toString()} ref={sideDrawerRef}>
      <SideDrawerWrapper>
        <Heading>My account</Heading>
        <ProfilePicComponent />

        <ProfileTextContainer>
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

          {isFullNameEdit && fullname !== loggedInUser?.fullname && (
            <PrimaryButton
              style={{
                fontSize: ".9rem",
                width: "80px",
                margin: "0 0 0 auto",
              }}
              onClick={handleFullNameSave}
            >
              Save
            </PrimaryButton>
          )}
        </ProfileTextContainer>

        <ProfileTextContainer>
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

          {isBioEdit && bio !== loggedInUser?.profileInfo?.bio && (
            <PrimaryButton
              style={{
                fontSize: ".9rem",
                width: "80px",
                margin: "0 0 0 auto",
              }}
              onClick={handleBioSave}
            >
              Save
            </PrimaryButton>
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
