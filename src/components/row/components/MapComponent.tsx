"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useCountries } from "../lib/getCountries";
import L from "leaflet";
import "@/styles/leaflet.css";

interface MapComponentProps {
  locationValue: string;
}

// Fix for the default icon issue in Leaflet with Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/marker-icon-2x.png",
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
});

const MapComponent = ({ locationValue }: MapComponentProps) => {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng || [51.505, -0.09]; // Default to London

  return (
    <MapContainer
      center={coordinates as [number, number]}
      zoom={13}
      scrollWheelZoom={false}
      className="h-[35vh] rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={coordinates as [number, number]} />
    </MapContainer>
  );
};

export default MapComponent; 