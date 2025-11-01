import React, { createContext, useContext, useState, useEffect } from "react";
import type { FilterSatellite } from "../types/Filter";

type SelectedSatellite = {
  id: string;
  hasTimeSeries: boolean;
};

type FilterSatelliteContextType = {
  filter: FilterSatellite;
  appliedFilter: FilterSatellite;
  setFilter: (filter: FilterSatellite) => void;
  applyFilter: () => void;
  selectedSatellites: SelectedSatellite[];
  setSelectedSatellites: React.Dispatch<React.SetStateAction<SelectedSatellite[]>>;
};

const defaultFilterSatellite: FilterSatellite = {
  name_satellite: "",
  id_satellite: "",
  start_date_satellite: new Date(),
  end_date_satellite: new Date(),
  coverage_area: "",
  coverage_country: "",
};

const FilterSatelliteContext = createContext<FilterSatelliteContextType>({
  filter: defaultFilterSatellite,
  appliedFilter: defaultFilterSatellite,
  setFilter: () => {},
  applyFilter: () => {},
  selectedSatellites: [],
  setSelectedSatellites: () => {},
});

export const FiltroProvider = ({ children }: { children: React.ReactNode }) => {
  const [filter, setFilter] = useState<FilterSatellite>(defaultFilterSatellite);
  const [appliedFilter, setAppliedFilter] = useState<FilterSatellite>(defaultFilterSatellite);
  const [firstApply, setFirstApply] = useState(true);
  const [selectedSatellites, setSelectedSatellites] = useState<SelectedSatellite[]>([]);

  const applyFilter = () => {
    if (firstApply) {
      setAppliedFilter(defaultFilterSatellite);
      setFirstApply(false);
    } else {
      setAppliedFilter(filter);
    }
  };

  // Log apenas quando o estado realmente muda
  useEffect(() => {
    console.log("📡 selectedSatellites atualizado:", selectedSatellites);
  }, [selectedSatellites]);

  return (
    <FilterSatelliteContext.Provider
      value={{
        filter,
        appliedFilter,
        setFilter,
        applyFilter,
        selectedSatellites,
        setSelectedSatellites,
      }}
    >
      {children}
    </FilterSatelliteContext.Provider>
  );
};

export const useFilter = () => useContext(FilterSatelliteContext);
