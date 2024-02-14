import React, { useRef, useState } from "react";
import {
  Button,
  ButtonContainer,
  LocationPreviewContainer,
  LocationPreviewMap,
  SecondaryButton,
} from "../../../../Styles/Components/Chats/ChatWindow/Footer/LocationPreview";
import {
  CloseButton,
  Header,
} from "../../../../Styles/Components/Chats/ChatWindow/Footer/Preview";
import { IoMdCloseCircle } from "react-icons/io";
import useOutsideClick from "../../../../Utils/useOutsideClick";
import ShareLocation from "./ShareLocation";

const LocationPreview = ({
  selectedLocation,
  setSelectedLocation,
  setShowLocationPreview,
  handleFormSubmit,
}) => {
  const locationPreviewRef = useRef(null);

  // Handle location selected
  const handleLocationSelected = (e) => {
    e.preventDefault();
    const url = `https://www.google.com/maps/search/?api=1&query=${selectedLocation.lat},${selectedLocation.lng}`;
    setShowLocationPreview(false);
    handleFormSubmit(e, url, "location");
    setSelectedLocation(null);
  };

  // Close location preview
  const handleClose = (e) => {
    if (e) e.preventDefault();
    setShowLocationPreview(false);
  };

  // Close location preview when clicked outside
  useOutsideClick(locationPreviewRef, () => {
    console.log("Location Preview closed on outside click");
    handleClose();
  });

  return (
    <LocationPreviewContainer ref={locationPreviewRef}>
      <Header>
        <h4>Preview</h4>
        <CloseButton onClick={handleClose} title="cancel">
          <IoMdCloseCircle />
        </CloseButton>
      </Header>

      <LocationPreviewMap>
        <ShareLocation
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
      </LocationPreviewMap>

      <ButtonContainer>
        <SecondaryButton
          onClick={() => {
            setSelectedLocation(null);
          }}
          disabled={!selectedLocation}
        >
          Clear Location
        </SecondaryButton>

        <Button onClick={handleLocationSelected} disabled={!selectedLocation}>
          Send Location
        </Button>
      </ButtonContainer>
    </LocationPreviewContainer>
  );
};

export default LocationPreview;
