import React, { useState } from "react";
import {
  CloseButton,
  Header,
  LoadingContainer,
  PreviewContainer,
  PreviewImage,
  PreviewImageContainer,
} from "../../../../Styles/Components/Chats/Footer/Preview";
import { IoMdCloseCircle } from "react-icons/io";
import { Loading } from "../../../Loading/Loading";

const Preview = (props) => {
  const { selectedImageOrVideo, setSelectedImageOrVideo, previewLoading } =
    props;

  const imgOrVideoSrc = selectedImageOrVideo
    ? URL.createObjectURL(selectedImageOrVideo)
    : null;

  const fileType = selectedImageOrVideo
    ? selectedImageOrVideo.type.split("/")[0]
    : null;

  const handlePreviewClose = (e) => {
    setSelectedImageOrVideo(null);
    e.stopPropagation();
  };

  const renderPreview = () => {
    switch (fileType) {
      case "image":
        return <PreviewImage src={imgOrVideoSrc} alt="image" />;

      case "video":
        return (
          <video controls width="100%" height="auto">
            <source src={imgOrVideoSrc} type="video/mp4" />
            Your browser does not support the video tag. Try using a different
            browser or paste the link in the address bar. Link : {imgOrVideoSrc}
          </video>
        );

      default:
        return null;
    }
  };

  return (
    <PreviewContainer>
      <Header>
        <h4>Preview</h4>
        <CloseButton onClick={handlePreviewClose} title="cancel">
          <IoMdCloseCircle />
        </CloseButton>
      </Header>

      {imgOrVideoSrc && (
        <PreviewImageContainer>
          {renderPreview()}

          {previewLoading && (
            <LoadingContainer>
              <Loading width={150} height={150} />
            </LoadingContainer>
          )}
        </PreviewImageContainer>
      )}
    </PreviewContainer>
  );
};

export default Preview;
