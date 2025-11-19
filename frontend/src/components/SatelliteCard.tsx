import React from "react";
import { useFilter } from "../context/FilterSatelliteContext";
import type { ISatelliteCardProps } from "../types/ISatelliteCardProps";
import "../styles/satelliteCard.css";

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

  const isChecked = selectedSatellites.some((s) => s.id === id);

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
        <i className="fa-solid fa-satellite card-satellite-icon"></i>
        <h3 className="name-text">{title}</h3>
      </div>

      <div className="card-info">
        {id && <p className="id-text">ID: {id.toUpperCase()}</p>}
        <div className="info-row info-columns">
          {updatedTime && updatedTime !== "N/A" && (
            <p>
              <i className="fa-duotone fa-regular fa-calendar"></i>{" "}
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
        <button className="card-button">
          <i className="fa-solid fa-eye card-icon"></i> Visualizar
        </button>
      </div>
    </div>
  );
};

export default SatelliteCard;
