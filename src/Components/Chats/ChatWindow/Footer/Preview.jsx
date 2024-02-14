import React, { useRef, useState } from "react";
import {
  CloseButton,
  Header,
  IconContainer,
  LoadingContainer,
  PreviewContainer,
  PreviewImageContainer,
} from "../../../../Styles/Components/Chats/ChatWindow/Footer/Preview";
import { IoMdCloseCircle } from "react-icons/io";
import { Loading } from "../../../Loading/Loading";
import { FaFile, FaFilePdf } from "react-icons/fa6";
import { BsFiletypePpt, BsFiletypeTxt } from "react-icons/bs";
import { SiGoogledocs, SiGooglesheets } from "react-icons/si";
import useOutsideClick from "../../../../Utils/useOutsideClick";

const Preview = (props) => {
  const { selectedFile, setSelectedFile, previewLoading } = props;
  const previewContainerRef = useRef(null);

  const fileType = selectedFile ? selectedFile.type.split("/")[0] : null;
  const fileSrc = selectedFile ? URL.createObjectURL(selectedFile) : null;

  const handlePreviewClose = (e) => {
    setSelectedFile(null);
    e.stopPropagation();
  };

  // Close preview on click outside
  useOutsideClick(
    previewContainerRef,
    () => {
      console.log("Preview closed on outside click");
      setSelectedFile(null);
    },
    selectedFile,
    [props.sendButtonRef]
  );

  // Render preview based on file type
  const renderPreview = () => {
    switch (fileType) {
      case "image":
        return <img src={fileSrc} alt="image" />;

      case "video":
        return (
          <video controls>
            <source src={fileSrc} type="video/mp4" />
            Your browser does not support the video tag. Try using a different
            browser or paste the link in the address bar. Link : {fileSrc}
          </video>
        );

      default:
        const fileExtension = selectedFile.name.split(".").pop();
        let icon;

        switch (fileExtension) {
          case "pdf":
            icon = <FaFilePdf />;
            break;

          case "doc":
          case "docx":
            icon = <SiGoogledocs />;
            break;

          case "ppt":
          case "pptx":
            icon = <BsFiletypePpt />;
            break;

          case "xls":
          case "xlsx":
            icon = <SiGooglesheets />;
            break;

          case "txt":
            icon = <BsFiletypeTxt />;
            break;

          default:
            icon = <FaFile />;
        }

        return (
          <IconContainer>
            <span>{icon}</span>
            <p>{selectedFile.name}</p>
          </IconContainer>
        );
    }
  };

  return (
    <PreviewContainer ref={previewContainerRef}>
      <Header>
        <h4>Preview</h4>
        <CloseButton onClick={handlePreviewClose} title="cancel">
          <IoMdCloseCircle />
        </CloseButton>
      </Header>

      {fileSrc && (
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
