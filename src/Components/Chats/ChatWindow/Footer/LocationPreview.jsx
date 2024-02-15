import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ButtonContainer,
  CurrentLocationButton,
  LocationPreviewContainer,
  LocationPreviewMap,
  SecondaryButton,
  SendLocationButton,
} from "../../../../Styles/Components/Chats/ChatWindow/Footer/LocationPreview";
import {
  CloseButton,
  Header,
} from "../../../../Styles/Components/Chats/ChatWindow/Footer/Preview";
import { IoMdCloseCircle } from "react-icons/io";
import { FaLocationCrosshairs } from "react-icons/fa6";
import useOutsideClick from "../../../../Utils/useOutsideClick";
import ShareLocation from "./ShareLocation";
import MyContext from "../../../../Context/MyContext";

const LocationPreview = ({
  selectedLocation,
  setSelectedLocation,
  setShowLocationPreview,
  handleFormSubmit,
}) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const { showToastMessage } = useContext(MyContext);
  const locationPreviewRef = useRef(null);

  // Handle get current location
  const handleGetCurrentLocation = (e) => {
    e.preventDefault();
    if (!navigator.geolocation) {
      showToastMessage("Error", "Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        showToastMessage("Error", `Geolocation Error: ${error.message}`);
      }
    );
  };

  // Handle location selected
  const handleLocationSelected = (e) => {
    e.preventDefault();
    const url = `https://www.google.com/maps/search/?api=1&query=${selectedLocation.lat},${selectedLocation.lng}`;
    handleFormSubmit(e, url, "location");
    handleClose();
  };

  // Close location preview
  const handleClose = (e) => {
    if (e) e.preventDefault();
    setShowLocationPreview(false);
    setSelectedLocation(null);
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
          currentLocation={currentLocation}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
      </LocationPreviewMap>

      <ButtonContainer>
        <CurrentLocationButton
          title="current location"
          onClick={handleGetCurrentLocation}
        >
          <FaLocationCrosshairs />
        </CurrentLocationButton>

        <SecondaryButton
          onClick={() => {
            setSelectedLocation(null);
          }}
          disabled={!selectedLocation}
        >
          Clear Location
        </SecondaryButton>

        <SendLocationButton
          onClick={handleLocationSelected}
          disabled={!selectedLocation}
        >
          Send Location
        </SendLocationButton>
      </ButtonContainer>
    </LocationPreviewContainer>
  );
};

export default LocationPreview;
