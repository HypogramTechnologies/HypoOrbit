import React from "react";
import { useFilter } from "../context/FilterMapContext";
import { validateCoordinates } from "../utils/validateCoordinates";
import type { MapFilterProps } from "../types/MessageConfig";
import  { TypeMessage } from "../types/MessageConfig";
import "../styles/mapFilter.css";

const MapFilter:  React.FC<MapFilterProps> = ({ setMessageConfig }) => {
  const { setFilter } = useFilter();

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const coordinates = e.target.value.trim();
    console.log(coordinates);

    if (validateCoordinates(coordinates)) {
      const [latStr, lngStr] = coordinates.split(",");
      const lat = parseFloat(latStr);
      const lng = parseFloat(lngStr);

      if (!isNaN(lat) && !isNaN(lng)) {
        setFilter({ latitude: lat, longitude: lng });
        setMessageConfig({
          type: TypeMessage.Success,
          message: "Coordenadas válidas. Mapa será atualizado.",
          show: true,
        });
      }
    } else {
      setMessageConfig({
        type: TypeMessage.Error,
        message: "Coordenadas inválidas.",
        show: true,
      });
    }
  };

  return (
    <input
      id="input-search"
      type="text"
      defaultValue=""
      onBlur={inputChange}
      placeholder="ex: -15.793889, -47.882778"
      className="filter-container"
    />
  );
};

export default MapFilter;
