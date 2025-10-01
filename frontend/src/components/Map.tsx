import React from "react";
import { useEffect } from "react";
import { useFilter } from "../context/FilterMapContext";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/map.css";
import MapFilter from "../components/MapFilter";

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


const UpdateMap: React.FC = () => {
  const { filter } = useFilter();
  const map = useMap();

  useEffect(() => {
    if (!isNaN(filter.latitude) && !isNaN(filter.longitude)) {
      map.flyTo([filter.latitude, filter.longitude], 14, {
        animate: true,
        duration: 1,
      });
    }
  }, [filter, map]);

  return null;
};

const Mapa: React.FC = () => {
  const { filter } = useFilter();
  const position: [number, number] = [filter.latitude, filter.longitude];
  console.log(position);
  return (
      
      

    <div className="map-container">
      
      <div>
        <div style={{ width: "100%", height: "100vh"}}>
          <MapFilter/>
          <MapContainer center={position} zoom={12} style={{ height: "100%", width: "100%" }}>
            
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <ClickHandler />
            <UpdateMap />
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
    </div>
  );
};

export default Mapa;
