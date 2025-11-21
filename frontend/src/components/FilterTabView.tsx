import React from "react";
import FilterChip from "./FilterChip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faSatellite,
  faMapMarkerAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import type { IFilterTabViewProps } from "../types/IFilterTabViewProps";
import "../styles/filterTabView.css";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function FilterTabView ({ filterParams, onClearFilters }: IFilterTabViewProps){
  if (!filterParams) {
    return (
      <div className="card-tab-view-empty">
        <p>Nenhum parâmetro de filtro aplicado para esta consulta.</p>
      </div>
    );
  }

  const { coverages, startDate, endDate, latitude, longitude } = filterParams;

  const formatMonthYear = (dateString: string): string => {
    try {
      const date = new Date(dateString + "T00:00:00");
      return format(date, "MMM yyyy", { locale: ptBR });
    } catch (e) {
      return dateString;
    }
  };

  const periodValue = `${formatMonthYear(startDate)} - ${formatMonthYear(
    endDate
  )}`;

  const collectionNames = coverages.join(", ");

  const locationValue = (
    <span>
      Lat: {parseFloat(latitude).toFixed(4)} <br />
      Lon: {parseFloat(longitude).toFixed(4)}
    </span>
  );

  return (
    <div className="filter-tab-view">
      <h2 className="tab-title">Parâmetros de análise</h2>
      <p className="tab-subtitle">
        Configurações aplicadas na geração das séries temporais.
      </p>

      <div className="filters-applied-box">
        <div className="filters-applied-header">
          <h3>Filtros aplicados</h3>
          <button className="clear-filters-button" onClick={onClearFilters}>
            <FontAwesomeIcon icon={faTimes} /> Limpar filtros
            
          </button>
        </div>

        <p className="filters-description">
          Filtros aplicados para gerar estas séries temporais.
        </p>

        <div className="filter-chips-container">
          <FilterChip
            label="Período"
            value={periodValue}
            icon={<FontAwesomeIcon icon={faCalendarAlt} />}
          />

          <FilterChip
            label="Satélites"
            value={collectionNames}
            icon={<FontAwesomeIcon icon={faSatellite} />}
          />

          <FilterChip
            label="Coordenadas"
            value={locationValue}
            icon={<FontAwesomeIcon icon={faMapMarkerAlt} />}
          />
        </div>
      </div>
    </div>
  );
};