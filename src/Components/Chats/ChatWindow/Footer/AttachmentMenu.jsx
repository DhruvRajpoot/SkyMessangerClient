import React, { useContext, useRef, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { GoFileDirectoryFill } from "react-icons/go";
import {
  AttachmentMenuContainer,
  HiddenInput,
} from "../../../../Styles/Components/Chats/Footer/AttachmentMenu";
import MyContext from "../../../../Context/MyContext";
import { IoMdPhotos } from "react-icons/io";

const AttachmentMenu = (props) => {
  const { showToastMessage } = useContext(MyContext);
  const imageVideoInputRef = useRef(null);
  const documentInputRef = useRef(null);

  // Handle image or video button click
  const handleImageOrVideoClick = (e) => {
    imageVideoInputRef.current.click();
    props.setShowAttachMenu(false);
    e.stopPropagation();
  };

  // Handle image or video change
  const handleImageOrVideoChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
        props.setSelectedImageOrVideo(file);
      } else {
        showToastMessage("Error", "Please select an image or video file");
      }
    }
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
      <div onClick={handleImageOrVideoClick}>
        <IoMdPhotos />
        <span>Image / Video</span>
        <HiddenInput
          type="file"
          accept="image/*,video/*"
          id="imagevideo"
          ref={imageVideoInputRef}
          value={""}
          onChange={handleImageOrVideoChange}
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
