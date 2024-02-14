import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapClickHandler = ({ setSelectedLocation }) => {
  useMapEvents({
    click: (e) => {
      setSelectedLocation(e.latlng);
    },
  });

  return null;
};

const ShareLocation = ({ selectedLocation, setSelectedLocation }) => {
  const [currentLocation, setCurrentLocation] = useState([23.2599, 77.4126]);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MapContainer
        center={currentLocation}
        zoom={10}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={25}
        />

        <MapClickHandler setSelectedLocation={setSelectedLocation} />

        {selectedLocation && (
          <Marker position={selectedLocation}>
            <Popup>
              Selected Location: <br />
              Latitude: {selectedLocation.lat.toFixed(6)} <br />
              Longitude: {selectedLocation.lng.toFixed(6)}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default ShareLocation;
