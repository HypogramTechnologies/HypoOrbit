import React from "react";
import { useFilter } from "../context/FilterSatelliteContext";
import { validateCoordinates } from "../utils/validateCoordinates";
import type { SatelliteFilterProps } from "../types/MessageConfig";
import { TypeMessage } from "../types/MessageConfig";
import "../styles/satelliteFilter.css";

const SatelliteFilter: React.FC<SatelliteFilterProps> = ({ setMessageConfig, origin}) => {

  //origin //para controlar visibilidade

  const { setFilter } = useFilter();
 
  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const coordinates = e.target.value.trim();
    console.log(coordinates);

    if (validateCoordinates(coordinates)) {
      const [latStr, lngStr] = coordinates.split(",");
      const lat = parseFloat(latStr);
      const lng = parseFloat(lngStr);

      if (!isNaN(lat) && !isNaN(lng)) {
        // setFilter({ latitude: lat, longitude: lng });
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
      id="input-name-satellite"
      type="text"
      defaultValue=""
      onBlur={inputChange}
      placeholder="Nome do satélite ou coleção"
      className=""
    />
  );
};

export default SatelliteFilter;
