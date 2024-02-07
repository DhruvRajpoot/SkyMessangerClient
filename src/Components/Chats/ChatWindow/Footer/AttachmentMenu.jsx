import React, { useContext, useRef, useState } from "react";
import { MdPhotoSizeSelectActual } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GoFileDirectoryFill } from "react-icons/go";
import {
  AttachmentMenuContainer,
  HiddenInput,
} from "../../../../Styles/Components/Chats/Footer/AttachmentMenu";
import MyContext from "../../../../Context/MyContext";

const AttachmentMenu = (props) => {
  const { showToastMessage } = useContext(MyContext);
  const photoInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const documentInputRef = useRef(null);

  // Handle photo
  const handlePhotoClick = (e) => {
    photoInputRef.current.click();
    props.setShowAttachMenu(false);
    e.stopPropagation();
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.type.startsWith("image/")) {
        props.setSelectedImage(file);
      } else {
        showToastMessage("Error", "Please select an image file");
      }
    }
  };

  // Handle video button click
  const handleVideoClick = (e) => {
    videoInputRef.current.click();
    props.setShowAttachMenu(false);
    e.stopPropagation();
  };

  // Handle document button click
  const handleDocumentClick = (e) => {
    console.log("Document clicked");
    documentInputRef.current.click();
    props.setShowAttachMenu(false);
    e.stopPropagation();
  };

  // Handle location button click
  const handleLocationClick = (e) => {
    console.log("Location clicked");
    props.setShowAttachMenu(false);
    e.stopPropagation();
  };

  return (
    <AttachmentMenuContainer showattachmenu={props.showAttachMenu.toString()}>
      <div onClick={handlePhotoClick}>
        <MdPhotoSizeSelectActual />
        <span>Photo</span>
        <HiddenInput
          type="file"
          accept="image/*"
          ref={photoInputRef}
          value={""}
          onChange={handlePhotoChange}
        />
      </div>

      <div onClick={handleVideoClick}>
        <FaVideo />
        <span>Video</span>
        <HiddenInput
          type="file"
          accept="video/*"
          id="video"
          ref={videoInputRef}
        />
      </div>

      <div onClick={handleDocumentClick}>
        <GoFileDirectoryFill />
        <span>Document</span>
        <HiddenInput
          type="file"
          accept=".pdf,.doc,.docx,.txt,.ppt,.pptx,.xls,.xlsx"
          id="document"
          ref={documentInputRef}
        />
      </div>

      <div onClick={handleLocationClick}>
        <FaLocationDot />
        <span>Location</span>
      </div>
    </AttachmentMenuContainer>
  );
};

export default AttachmentMenu;
