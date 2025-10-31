import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { useFilter } from "../context/FilterSatelliteContext";
import { validateCoordinates } from "../utils/validateCoordinates";
import type { SatelliteFilterProps } from "../types/MessageConfig";
import { TypeMessage } from "../types/MessageConfig";
import "../styles/satelliteFilter.css";

const SatelliteFilter: React.FC<SatelliteFilterProps> = ({
  setMessageConfig,
  origin,
  satellites,
  setFilteredSatellites,
}) => {
  const { setFilter } = useFilter();

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [selectedSatellites, setSelectedSatellites] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    let filtered = satellites;

    if (name.trim()) {
      filtered = filtered.filter((sat) =>
        sat.title.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (selectedSatellites.length > 0) {
      const selectedTitles = selectedSatellites.map((s) => s.value);
      filtered = filtered.filter((sat) => selectedTitles.includes(sat.title));
    }

    setFilteredSatellites(filtered);
  }, [name, selectedSatellites, satellites, setFilteredSatellites]);

  const handleInputCoordinates = (e: React.ChangeEvent<HTMLInputElement>) => {
    const coordinates = e.target.value.trim();

    if (validateCoordinates(coordinates)) {
      setMessageConfig({
        type: TypeMessage.Success,
        message: "Coordenadas válidas. O mapa será atualizado.",
        show: true,
      });
    } else {
      setMessageConfig({
        type: TypeMessage.Error,
        message: "Coordenadas inválidas.",
        show: true,
      });
    }
  };

  const handleComparerClick = () => {
    if (!startDate || !endDate) {
      // setMessageConfig({
      //   type: TypeMessage.Error,
      //   message: "Selecione o período completo antes de comparar.",
      //   show: true,
      // });
      // return;
    }
  };

  const satelliteOptions = satellites.map((sat) => ({
    value: sat.title,
    label: sat.title,
  }));

  return (
    <div className="satellite-filter-container">
      <div className="filter-item">
        <label>Nome do satélite ou coleção</label>
        <input
          type="text"
          placeholder="Buscar..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="filter-item">
        <label>Satélite</label>
        <Select
          isMulti
          options={satelliteOptions}
          value={selectedSatellites}
          onChange={(selected) => setSelectedSatellites(selected as any)}
          placeholder="Selecione um ou mais satélites..."
          menuPortalTarget={document.body} // faz o menu flutuar
          className="satellite-select" // classe do container
          classNames={{
            control: () => "satellite-select-control",
            menu: () => "satellite-select-menu",
            option: ({ isFocused, isSelected }) => {
              if (isSelected) return "satellite-select-option selected";
              if (isFocused) return "satellite-select-option focused";
              return "satellite-select-option";
            },
            multiValue: () => "satellite-select-multi-value",
            multiValueLabel: () => "satellite-select-multi-value-label",
            placeholder: () => "satellite-select-placeholder",
          }}
        />

      </div>

      <div className="filter-item">
        <label>Período para comparar</label>
        <div className="date-range">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date ?? undefined)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="dd/MM/yyyy"
            placeholderText="Data inicial"
            className="date-input"
          />
          <span>até</span>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date ?? undefined)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            dateFormat="dd/MM/yyyy"
            placeholderText="Data final"
            className="date-input"
          />
        </div>
      </div>

      <div className="filter-item button-group">
        <button className="btn compare" onClick={handleComparerClick}>
          Comparar
        </button>
       
      </div>
    </div>
  );
};

export default SatelliteFilter;
