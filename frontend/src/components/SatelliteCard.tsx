import React, { useState } from "react";
import { useFilter } from "../context/FilterSatelliteContext";
import type { ISatelliteCardProps } from "../types/ISatelliteCardProps";
import "../styles/satelliteCard.css";
import Modal from "../components/Modal";
import { SatelliteDetailView } from "../components/SatelliteDetailView"; 
import { StacService } from "../services/StacService";
import { stacToSatelliteData } from "../utils/stacToSatelliteData";
import type { ISatelliteData as IMappedSatelliteDetail } from "../types/SatelliteData";


const service = new StacService();

const SatelliteCard: React.FC<ISatelliteCardProps> = ({
  id,
  title,
  gsd,
  updatedTime,
  hasTimeSeries,
  spectralIndices,
  origin,
}) => {
  const { selectedSatellites, setSelectedSatellites } = useFilter();
  const checkboxId = `checkbox-${id}`;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSatellite, setSelectedSatellite] = useState<IMappedSatelliteDetail | null>(null); 

  const isChecked = selectedSatellites.some((s) => s.id === id);


  const handleOpenModal = async () => {
  try {
    const response = await service.getCollectionById(id);
    const stacData = response.data;

    const itemsResponse = await service.getCollectionItems(id);
    const itemsData = (itemsResponse.data as { features?: unknown[] }).features || [];

    const satelliteMapped = stacToSatelliteData(stacData, itemsData);
    satelliteMapped.spectralIndices = spectralIndices;
    console.log('satelliteMapped', satelliteMapped);
    setSelectedSatellite(satelliteMapped);
    setIsModalOpen(true);
     
  } catch (err) {
    console.error("Erro ao buscar detalhes do satélite", err);
  }
};


  const handleCloseModal = () => {
      setIsModalOpen(false);
     
  };


  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;

    setSelectedSatellites((prev) => {
      if (checked) {
        if (!prev.some((s) => s.id === id)) {
          return [...prev, { id, hasTimeSeries }];
        }
        return prev;
      } else {
        return prev.filter((s) => s.id !== id);
      }
    });
  };

  return (
    <div className="card-container">
      {origin === "Map" && (
        <div className="card-checkbox">
          <input
            type="checkbox"
            id={checkboxId}
            checked={isChecked}
            onChange={handleCheckboxChange}
          />

          <label htmlFor={checkboxId}></label>
        </div>
      )}

      <div className="card-header">
        {/* Assumindo que você tem a fonte Font Awesome configurada */}
        <i className="fa-solid fa-satellite card-satellite-icon"></i> 

        <div className="header-text">
          <h3 className="name-text">{title}</h3>
          {id && <p className="id-text">ID: {id.toUpperCase()}</p>}
        </div>
      </div>

      <div className="card-info">
        <div className="info-row info-columns">
          {updatedTime && updatedTime !== "N/A" && (
            <p>
              {/* Note: fa-duotone fa-regular fa-calendar pode estar incorreto, 
              o Font Awesome geralmente usa apenas 'fa-regular' ou 'fa-solid' */}
              <i className="fa-regular fa-calendar"></i>{" "}
              {updatedTime}
            </p>
          )}
          {gsd && (
            <p>
              <i className="fa-solid fa-location-dot card-icon blue"></i>{" "}
              {gsd.toFixed(2)} m
            </p>
          )}

          {spectralIndices &&
            spectralIndices.attributes &&
            spectralIndices.attributes.length > 0 && (
              <p>
                <i className="fa-solid fa-chart-line card-icon green"></i>{" "}
                Índices: {spectralIndices.attributes.join(", ")}
              </p>
            )}
        </div>
      </div>

      <div className="card-button-container">
        <button className="card-button" onClick={handleOpenModal}>
          <i className="fa-solid fa-eye card-icon"></i> Visualizar
        </button>
      </div>

      {/* AJUSTE CHAVE: Passando o satélite mapeado e a função de fechar */}
      {selectedSatellite && isModalOpen && (
        <Modal
          isOpen={isModalOpen}

          onClose={handleCloseModal} 
          title="Detalhamento"
          isFiltroVisible={false}
        > 
          <SatelliteDetailView 
            satellite={selectedSatellite}
          />
        </Modal>
      )}
    </div>
  );
};

export default SatelliteCard;