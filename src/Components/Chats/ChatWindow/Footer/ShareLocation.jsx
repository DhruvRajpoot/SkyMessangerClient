import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Handle Map Click (select location on map)
const MapClickHandler = ({ setSelectedLocation }) => {
  useMapEvents({
    click: (e) => {
      setSelectedLocation(e.latlng);
    },
  });

  return null;
};

// Fly to location on click on current location
const FlyToLocation = ({ location }) => {
  const map = useMap();
  useEffect(() => {
    if (location) {
      const currentZoom = map.getZoom();
      if (currentZoom < 15) {
        map.flyTo(location, 15);
      } else if (currentZoom >= 15 && currentZoom < 20) {
        map.setZoom(currentZoom + 1);
        map.flyTo(location, currentZoom + 1);
      } else {
        map.setZoom(18);
        map.flyTo(location, currentZoom);
      }
    }
  }, [map, location]);
};

// Share Location Component
const ShareLocation = ({
  currentLocation,
  selectedLocation,
  setSelectedLocation,
}) => {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MapContainer
        center={[23.2599, 77.4126]}
        zoom={10}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={20}
        />

        <MapClickHandler setSelectedLocation={setSelectedLocation} />

        <FlyToLocation location={currentLocation} />

        {selectedLocation && (
          <Marker position={selectedLocation} draggable>
            <Popup>
              Selected Location: <br />
              Latitude: {selectedLocation.lat.toFixed(6)} <br />
              Longitude: {selectedLocation.lng.toFixed(6)}
            </Popup>
          </Marker>
        )}

        {currentLocation && (
          <CircleMarker
            center={currentLocation}
            radius={8}
            color="#0145ff"
            fillColor="#0145ff"
          />
        )}
      </MapContainer>
    </div>
  );
};

export default ShareLocation;
