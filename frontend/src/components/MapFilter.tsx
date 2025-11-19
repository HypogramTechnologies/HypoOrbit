import React, { useState } from "react";
import { useFilter } from "../context/FilterMapContext";
import { validateCoordinates } from "../utils/validateCoordinates";
import { SearchService } from "../services/SearchService";
import type { MapFilterPropsExtended } from "../types/MessageConfig";
import { TypeMessage } from "../types/MessageConfig";
import "../styles/mapFilter.css";

const MapFilter: React.FC<MapFilterPropsExtended> = ({
  setMessageConfig,
  isFiltroVisible,
  openHistory,
  setOpenHistory,
}) => {
  const [lastSearches, setLastSearches] = useState<any[]>([]);
  const { setFilter } = useFilter();

  const inputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const coordinates = e.target.value.trim();

    if (!validateCoordinates(coordinates)) {
      setMessageConfig({
        type: TypeMessage.Error,
        message: "Coordenadas inválidas.",
        show: true,
      });
      return;
    }

    const [latStr, lngStr] = coordinates.split(",");
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
      const data = (response as { data: any[] }).data;

      setLastSearches(data);
    } catch (error) {
      console.error("Erro ao salvar busca:", error);
    }
  };

  /* const [openHistory, setOpenHistory] = useState(false); */
  const [inputValue, setInputValue] = useState("");

  return (
    <div
      className={`filter-box-container ${
        isFiltroVisible ? "menu-visible" : "menu-hidden"
      }`}
    >
      <div className="filter-box">
        <input
          id="input-search"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={inputChange}
          placeholder="ex: -15.793889, -47.882778"
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
