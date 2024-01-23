import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Input,
  Label,
  ProfilePic,
  ProfilePicContainer,
  ProfilePicHover,
  SideDrawerContainer,
  SideDrawerWrapper,
  Heading,
  ProfileTextContainer,
  InputContainer,
  EditButton,
} from "../../Styles/Components/Chats/SideDrawer";
import UserContext from "../../Context/UserContext";
import { PrimaryButton } from "../../Styles/Common";

export const SideDrawer = (props) => {
  const { loggedInUser } = useContext(UserContext);
  const sideDrawerRef = useRef(null);

  const [fullname, setFullname] = useState(loggedInUser?.fullname);
  const [bio, setBio] = useState(loggedInUser?.bio);
  const [email, setEmail] = useState(loggedInUser?.email);

  useEffect(() => {
    setFullname(loggedInUser?.fullname);
    setBio(loggedInUser?.bio);
    setEmail(loggedInUser?.email);
  }, [loggedInUser]);

  const [isFullNameEdit, setIsFullNameEdit] = useState(false);
  const [isBioEdit, setIsBioEdit] = useState(false);

  const handleFullNameEditClick = (e) => {
    setFullname(loggedInUser?.fullname);
    setIsFullNameEdit(!isFullNameEdit);
  };

  const handleBioEditClick = (e) => {
    setBio(loggedInUser?.bio);
    setIsBioEdit(!isBioEdit);
  };

  const handleFullNameSave = (e) => {
    // Save the fullname to the database
    setIsFullNameEdit(false);
    localStorage.setItem("user", JSON.stringify({ ...loggedInUser, fullname }));
  };

  const handleBioSave = (e) => {
    // Save the bio to the database
    setIsBioEdit(false);
    localStorage.setItem("user", JSON.stringify({ ...loggedInUser, bio }));
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

        <ProfilePicContainer>
          <ProfilePic src="https://picsum.photos/200" />
          <ProfilePicHover>
            <p>Change Profile Pic</p>
          </ProfilePicHover>
        </ProfilePicContainer>

        <ProfileTextContainer>
          <Label htmlFor="fullname">Full Name</Label>
          <InputContainer>
            <Input
              type="text"
              name="fullname"
              value={fullname}
              readOnly={!isFullNameEdit}
              onChange={(e) => setFullname(e.target.value)}
              iseditable={isFullNameEdit.toString()}
            />

            <EditButton onClick={handleFullNameEditClick}>
              {isFullNameEdit ? "Cancel" : "Edit"}
            </EditButton>
          </InputContainer>

          {isFullNameEdit && fullname !== loggedInUser?.fullname && (
            <PrimaryButton
              fontsize={".9rem"}
              width={"80px"}
              margin={"0 0 0 auto"}
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
              value={bio}
              readOnly={!isBioEdit}
              onChange={(e) => setBio(e.target.value)}
              iseditable={isBioEdit.toString()}
            />

            <EditButton onClick={handleBioEditClick}>
              {isBioEdit ? "Cancel" : "Edit"}
            </EditButton>
          </InputContainer>

          {isBioEdit && bio !== loggedInUser?.bio && (
            <PrimaryButton
              fontsize={".9rem"}
              width={"80px"}
              margin={"0 0 0 auto"}
              onClick={handleBioSave}
            >
              Save
            </PrimaryButton>
          )}
        </ProfileTextContainer>

        <ProfileTextContainer>
          <Label>Email</Label>
          <Input type="text" value={email} readOnly />
          <br />
        </ProfileTextContainer>
      </SideDrawerWrapper>
    </SideDrawerContainer>
  );
};
