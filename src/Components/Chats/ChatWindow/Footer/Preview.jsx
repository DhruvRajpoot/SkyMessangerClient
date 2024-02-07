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
  const { selectedImage, setSelectedImage, previewLoading } = props;

  const imgSrc = selectedImage ? URL.createObjectURL(selectedImage) : null;

  return (
    <PreviewContainer>
      <Header>
        <h4>Preview</h4>
        <CloseButton onClick={() => setSelectedImage(null)} title="cancel">
          <IoMdCloseCircle />
        </CloseButton>
      </Header>

      {imgSrc && (
        <PreviewImageContainer>
          <PreviewImage src={imgSrc} alt="preview" />
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
