import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { useFilter } from "../context/FilterSatelliteContext";
import type { SatelliteFilterProps } from "../types/MessageConfig";
import { TypeMessage } from "../types/MessageConfig";
import "../styles/satelliteFilter.css";
import "../index.css";

const SatelliteFilter: React.FC<SatelliteFilterProps> = ({
  setMessageConfig,
  origin,
  satellites,
  setFilteredSatellites,
}) => {
  const { selectedSatellites } = useFilter(); // não vamos mais sobrescrever aqui
  const [name, setName] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  // monta opções do combo
  const satelliteOptions = satellites.map((sat) => ({
    value: sat.id,
    label: sat.title,
  }));

  // aplica o filtro (nome + combo)
  useEffect(() => {
    let filtered = satellites;

    // filtro por nome digitado
    if (name.trim()) {
      filtered = filtered.filter((sat) =>
        sat.title.toLowerCase().includes(name.toLowerCase())
      );
    }

    // filtro por combo de seleção
    if (selectedOptions.length > 0) {
      const selectedIds = selectedOptions.map((opt) => opt.value);
      filtered = filtered.filter((sat) => selectedIds.includes(sat.id));
    }

    setFilteredSatellites(filtered);
  }, [name, selectedOptions, satellites, setFilteredSatellites]);

  const handleComparerClick = () => {
    if (!startDate || !endDate) {
      setMessageConfig({
        type: TypeMessage.Warning,
        message: "Selecione o período antes de comparar.",
        show: true,
      });
    }
  };

  const handleShowSelected = () => {
    if (selectedSatellites.length === 0) {
      setMessageConfig({
        type: TypeMessage.Warning,
        message: "Nenhum satélite selecionado.",
        show: true,
      });
      return;
    }

    const selectedIds = selectedSatellites.map((s) => s.id);
    const filtered = satellites.filter((sat) => selectedIds.includes(sat.id));
    setFilteredSatellites(filtered);
  };

  const handleShowAll = () => {
    setFilteredSatellites(satellites);
    setSelectedOptions([]);
    setName("");
  };

  const handleTimeTemporaisClick = () => {
    const temporais = satellites.filter((sat) => sat.hasTimeSeries);
    setFilteredSatellites(temporais);
  };

  return (
    <div className="satellite-filter-container">
      <div className="filter-item">
        <label>Nome do satélite</label>
        <input
          type="text"
          placeholder="Buscar..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* <div className="filter-item">
        <label>Satélite</label>
        <Select
          isMulti
          options={satelliteOptions}
          value={selectedOptions}
          onChange={(selected) => setSelectedOptions(selected as any[])}
          placeholder="Selecione um ou mais satélites..."
          menuPortalTarget={document.body}
          className="satellite-select"
        />
      </div> */}

       <div className="filter-item">
        <label>Satélite</label>
        <Select
          isMulti
          options={satelliteOptions}
          value={selectedOptions}
          onChange={(selected) => setSelectedOptions(selected as any)}
          placeholder="Selecione um ou mais satélites..."
          menuPortalTarget={document.body} 
          className="satellite-select" 
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

      {origin === "Map" && (
        <>
          <div className="filter-item">
            <label>Período para comparar</label>
            <div className="date-range">
              <DatePicker
                selected={startDate}
                onChange={(date) => {
                  if (date && endDate && date > endDate) {
                    setMessageConfig({
                      type: TypeMessage.Error,
                      message:
                        "A data inicial não pode ser maior que a data final.",
                      show: true,
                    });
                    return;
                  }
                  setStartDate(date ?? undefined);
                }}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                dateFormat="dd/MM/yyyy"
                placeholderText="Data inicial"
                className="date-input"
                maxDate={endDate ?? undefined}
              />
              <span>até</span>
              <DatePicker
                selected={endDate}
                onChange={(date) => {
                  if (date && startDate && date < startDate) {
                    setMessageConfig({
                      type: TypeMessage.Error,
                      message:
                        "A data final não pode ser menor que a data inicial.",
                      show: true,
                    });
                    return;
                  }
                  setEndDate(date ?? undefined);
                }}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate ?? undefined}
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
        </>
      )}

      <div className="filter-tags">
        {origin === "Map" && (
          <button
            className="tag tag-warning marginRight10"
            onClick={handleShowSelected}
          >
            Selecionados
          </button>
        )}

        <button
          className="tag tag-wtss marginRight10"
          onClick={handleTimeTemporaisClick}
        >
          Séries temporais
        </button>

        <button
          className="tag tag-info marginRight10"
          onClick={handleShowAll}
        >
          Todos
        </button>
      </div>
    </div>
  );
};

export default SatelliteFilter;
