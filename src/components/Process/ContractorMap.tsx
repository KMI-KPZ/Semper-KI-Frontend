import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

// Typing for the coordinates
type Coordinates = {
  lat: number;
  lng: number;
};

interface ContractorMapProps {
  contractorCoordinates: [number, number];
  clientCoordinates: [number, number];
}

const ContractorMap: React.FC<ContractorMapProps> = (props) => {
  const { clientCoordinates, contractorCoordinates } = props;

  const pointA: Coordinates = {
    lat: clientCoordinates[0],
    lng: clientCoordinates[1],
  };
  const pointB: Coordinates = {
    lat: contractorCoordinates[0],
    lng: contractorCoordinates[1],
  };

  // Calculate the midpoint between the two points
  const calculateMidPoint = (
    point1: Coordinates,
    point2: Coordinates
  ): Coordinates => {
    const lat = (point1.lat + point2.lat) / 2;
    const lng = (point1.lng + point2.lng) / 2;
    return { lat, lng };
  };

  const midpoint = calculateMidPoint(pointA, pointB);

  // The polyline will connect pointA and pointB
  const lineCoordinates: LatLngExpression[] = [
    [pointA.lat, pointA.lng],
    [pointB.lat, pointB.lng],
  ];

  // Helper component to fix map offset by invalidating the map size
  const MapInvalidator = () => {
    const map = useMap();
    useEffect(() => {
      map.invalidateSize();
    }, [map]);
    return null;
  };

  return (
    <MapContainer
      center={[midpoint.lat, midpoint.lng]}
      zoom={13}
      style={{ width: "200px", height: "200px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={[pointA.lat, pointA.lng]}>
        <Popup>Point A</Popup>
      </Marker>
      <Marker position={[pointB.lat, pointB.lng]}>
        <Popup>Point B</Popup>
      </Marker>

      <Polyline positions={lineCoordinates} color="blue" />

      <MapInvalidator />
    </MapContainer>
  );
};

export default ContractorMap;
