import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import CustomModal from "./../modal/popup";
import React from "react";

// Import marker icons
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Custom marker icon size
const customMarkerIcon = new L.Icon({
  iconUrl: markerIcon,
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  shadowUrl: markerShadow,
  shadowSize: [68, 95],
  shadowAnchor: [22, 94],
});

// Component to fit map bounds
const FitBounds = ({ locations }) => {
  const map = useMap();
  const positions = locations.map((location) => [
    location.latitude,
    location.longitude,
  ]);

  if (positions.length > 0) {
    const bounds = L.latLngBounds(positions);
    map.fitBounds(bounds);
  }

  return null; // No rendering required
};

const PenguinMap = ({ locations }) => {
  const defaultPosition = [0, 0];
  const [selectedLocation, setSelectedLocation] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedLocation(null);
  };

  return (
    <>
      {/* Conditionally render the map */}
      {!modalOpen && (
        <MapContainer
          center={defaultPosition}
          zoom={2}
          style={{ height: "100vh", width: "100%" }}
          touchZoom={true}
          dragging={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {locations.map((location, index) => (
            <Marker
              key={index}
              position={[location.latitude, location.longitude]}
              icon={customMarkerIcon}
              eventHandlers={{
                click: () => handleMarkerClick(location),
              }}
            />
          ))}

          <FitBounds locations={locations} />
        </MapContainer>
      )}

      <CustomModal
        isOpen={modalOpen}
        onClose={closeModal}
        location={selectedLocation}
      />
    </>
  );
};

export default PenguinMap;
