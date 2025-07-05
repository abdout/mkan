"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useCountries } from "../lib/getCountries";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface DynamicMapProps {
  locationValue: string;
}

// Fix for the default icon issue in Leaflet with Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png"
});

const DynamicMap = ({ locationValue }: DynamicMapProps) => {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng || [51.505, -0.09]; // Default to London

  if (typeof window === "undefined") {
    return null;
  }

  return (
    <MapContainer
      center={coordinates as [number, number]}
      zoom={13}
      scrollWheelZoom={false}
      className="h-[35vh] rounded-lg relative z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={coordinates as [number, number]} />
    </MapContainer>
  );
};

export default DynamicMap; 