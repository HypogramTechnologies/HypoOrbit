import React from "react";
import { useEffect, useState } from "react";
import { useFilter } from "../context/FilterMapContext";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/map.css";
import MapFilter from "../components/MapFilter";
import Modal from "../components/Modal";
import SatelliteList from "../components/SatelliteList";
import type { MapProps } from  "../types/MapProps";
import Message from "../components/Message";
import { TypeMessage } from "../types/MessageConfig";
import type { MessageConfig } from "../types/MessageConfig";
import { FiltroProvider as FilterSatelliteProvider } from "../context/FilterSatelliteContext"; 

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


const Mapa: React.FC<MapProps> = ({ isFiltroVisible }) => {
  const { filter } = useFilter();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [messageConfig, setMessageConfig] = useState<MessageConfig>({
    type: TypeMessage.Info,
    message: "",
    show: false,
  });

  const position: [number, number] = [
    filter.latitude || -15.7942,
    filter.longitude || -47.8822,
  ];

  return (
    <div className="map-container" style={{ width: "100%", height: "100vh" }}>
      <MapFilter setMessageConfig={setMessageConfig} isFiltroVisible={isFiltroVisible}  />

      <Message
        type={messageConfig.type}
        message={messageConfig.message}
        show={messageConfig.show}
        onClose={() => setMessageConfig({ ...messageConfig, show: false })}
        duration={3000}
      />

      <MapContainer center={position} zoom={12} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <ClickHandler />
        <UpdateMap />
        <Marker
          position={position}
          eventHandlers={{
            click: () => {
              setIsModalOpen(true); 
            },
          }}
        >
          <Popup>
                Coordenadas: <br />
                Lat: {filter.latitude.toFixed(5)} <br />
                Lng: {filter.longitude.toFixed(5)}
            </Popup>
        </Marker>
      </MapContainer>
        <FilterSatelliteProvider>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Lista de Satélites" isFiltroVisible={isFiltroVisible}>
          <SatelliteList isFiltroVisible={isFiltroVisible} origin='Map' coordinates = {position}/>
        </Modal>
       </FilterSatelliteProvider>
    </div>
  );
};

export default Mapa;
