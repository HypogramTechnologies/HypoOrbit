import React, { useState } from "react";
import { useFilter } from "../context/FilterMapContext";
import { validateCoordinates } from "../utils/validateCoordinates";
import { SearchService } from "../services/SearchService";
import type { MapFilterPropsExtended } from "../types/MessageConfig";
import { TypeMessage } from "../types/MessageConfig";
import "../styles/mapFilter.css";
import { GeocodeService } from "../services/GeocodeService";

const MapFilter: React.FC<MapFilterPropsExtended> = ({
  setMessageConfig,
  isFiltroVisible,
  openHistory,
  setOpenHistory,
}) => {
  const [lastSearches, setLastSearches] = useState<any[]>([]);
  const { setFilter } = useFilter();
  const [inputValue, setInputValue] = useState("");

  const inputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value.trim();


    if (validateCoordinates(text)) {
      const [latStr, lngStr] = text.split(",");
      const lat = parseFloat(latStr);
      const lng = parseFloat(lngStr);

      if (isNaN(lat) || isNaN(lng)) return;

      setFilter({ latitude: lat, longitude: lng });

      setMessageConfig({
        type: TypeMessage.Success,
        message: "Coordenadas válidas. Mapa será atualizado.",
        show: true,
      });

      try {
        const service = new SearchService();
        await service.createSearch(lat, lng);

        const response = await service.getLastSearches();
  
        const lastSearchesData = (response as { data: any[] }).data;
        setLastSearches(lastSearchesData);
      } catch (error) {
        console.error("Erro ao salvar busca:", error);
      }

      return;
    }


    try {
      const geo = new GeocodeService();
      const data_address = await geo.getAddress(text) as {
        features?: Array<{
          geometry: { coordinates: [number, number] };
          [key: string]: any;
        }>;
        [key: string]: any;
      };

      console.log("text", text, data_address); 

      if (!data_address || !data_address.features || data_address.features.length === 0) {
        setMessageConfig({
          type: TypeMessage.Error,
          message: "Endereço não encontrado.",
          show: true,
        });
        return;
      }

      const feature = data_address.features[0];
      const [lng, lat] = feature.geometry.coordinates;

      setInputValue(`${lat}, ${lng}`);

      setFilter({ latitude: lat, longitude: lng });

      setMessageConfig({
        type: TypeMessage.Success,
        message: "Endereço encontrado. Mapa atualizado.",
        show: true,
      });

      const service = new SearchService();
      await service.createSearch(lat, lng);
      const response = await service.getLastSearches();

      const data = (response as { data: any[] }).data;
      setLastSearches(data);

    } catch (error) {
      console.error("Erro ao buscar endereço:", error);

      setMessageConfig({
        type: TypeMessage.Error,
        message: "Erro ao buscar endereço.",
        show: true,
      });
    }

  };

  return (
    <div
      className={`filter-box-container ${isFiltroVisible ? "menu-visible" : "menu-hidden"
        }`}
    >
      <div className="filter-box">
        <input
          id="input-search"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={inputChange}
          placeholder="ex: -15.793889, -47.882778 ou Avenida Paulista, SP"
          className="filter-container"
        />

        <div
          className="history-icon"
          onClick={async () => {
            const newState = !openHistory;
            setOpenHistory(newState);

            if (newState) {
              try {
                const service = new SearchService();
                const response = await service.getLastSearches();
                const data = (response as { data: any[] }).data;
                setLastSearches(data);
              } catch (error) {
                console.error("Erro ao buscar últimas buscas:", error);
              }
            }
          }}
        >
          <i className="fa fa-history" aria-hidden="true"></i>
        </div>

        {openHistory && (
          <ul className="history-dropdown">
            {lastSearches.length === 0 && (
              <li className="empty-history">Nenhuma busca recente</li>
            )}

            {lastSearches.map((search) => (
              <li
                key={search._id}
                onClick={() => {
                  const value = `${search.latitude}, ${search.longitude}`;

                  setFilter({
                    latitude: search.latitude,
                    longitude: search.longitude,
                  });
                  setMessageConfig({
                    type: TypeMessage.Success,
                    message: "Busca aplicada.",
                    show: true,
                  });
                  setInputValue(value);
                  setOpenHistory(false);
                }}
              >
                {search.localizacao ||
                  `${search.latitude}, ${search.longitude}`}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MapFilter;
