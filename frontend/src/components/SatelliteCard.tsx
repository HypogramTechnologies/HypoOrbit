import React from "react";
import { useFilter } from "../context/FilterSatelliteContext";
import type { ISatelliteCardProps } from "../types/ISatelliteCardProps";
import "../styles/satelliteCard.css";

const SatelliteCard: React.FC<ISatelliteCardProps> = ({
  id,
  title,
  gsd,
  hasTimeSeries,
}) => {
  const { selectedSatellites, setSelectedSatellites } = useFilter();
  const checkboxId = `checkbox-${id}`;

  // Verifica se o satélite já está selecionado
  const isChecked = selectedSatellites.some((s) => s.id === id);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;

    setSelectedSatellites((prev) => {
      if (checked) {
        // adiciona somente se não existir
        if (!prev.some((s) => s.id === id)) {
          return [...prev, { id, hasTimeSeries }];
        }
        return prev; // já está na lista, não duplica
      } else {
        // remove apenas o desmarcado
        return prev.filter((s) => s.id !== id);
      }
    });
  };

  return (
    <div className="card-container">
      <div className="card-checkbox">
        <input
          type="checkbox"
          id={checkboxId}
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <label htmlFor={checkboxId}></label>
      </div>

      <div className="card-header">
        <i className="fa-solid fa-satellite card-satellite-icon"></i>
        <h3 className="name-text">{title}</h3>
      </div>

      <div className="card-info">
        {id && <p className="id-text">ID: {id.toUpperCase()}</p>}
        {gsd && (
          <p>
            <i className="fa-solid fa-location-dot card-icon red"></i> {gsd}m
          </p>
        )}
      </div>

      <div className="card-button-container">
        <button className="card-button">
          <i className="fa-solid fa-eye card-icon"></i> Visualizar
        </button>
      </div>
    </div>
  );
};

export default SatelliteCard;
