import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  useMap,
  Tooltip,
} from "react-leaflet";
import { LatLngBoundsExpression, LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { t } from "i18next";

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

  const lineCoordinates: LatLngExpression[] = [
    [pointA.lat, pointA.lng],
    [pointB.lat, pointB.lng],
  ];

  const bounds: LatLngBoundsExpression = [
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

  const FitBoundsComponent = () => {
    const map = useMap();
    useEffect(() => {
      map.fitBounds(bounds, { padding: [40, 50] });
    }, [map]);
    return null;
  };

  return (
    <MapContainer
      bounds={bounds}
      scrollWheelZoom={false}
      className="h-[200px] w-[300px] overflow-clip rounded-md  shadow-md"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={pointA}>
        <Tooltip permanent direction="top" offset={[-14, 15]}>
          {t("general.you")}
        </Tooltip>
      </Marker>
      <Marker position={pointB}>
        <Tooltip permanent direction="top" offset={[-14, 15]}>
          {t("general.manufacturer")}
        </Tooltip>
      </Marker>

      <Polyline positions={lineCoordinates} color="blue" />

      <FitBoundsComponent />
      <MapInvalidator />
    </MapContainer>
  );
};

export default ContractorMap;
