import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../Index.css";
import { useFilter } from "../context/FilterMapContext";

const ClickHandler: React.FC = () => {
  const { setFilter } = useFilter();
  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      console.log("Coordenadas clicadas:", lat, lng);

      setFilter({ latitude: lat, longitude: lng });
      map.flyTo([lat, lng], 14, { animate: true, duration: 1 });
    },
  });

  return null;
};

const Mapa: React.FC = () => {
  const { filter } = useFilter();
  const position: [number, number] = [filter.latitude, filter.longitude];

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "70vw", height: "100vh" }}>
        <MapContainer center={position} zoom={12} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        
          <ClickHandler />

          <Marker position={position} key={`${position[0]}-${position[1]}`}>
            <Popup>
              Coordenadas: <br />
              Lat: {filter.latitude.toFixed(5)} <br />
              Lng: {filter.longitude.toFixed(5)}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default Mapa;
