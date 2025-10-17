import React, { createContext, useContext, useState } from "react";
import type { FilterSatellite } from "../types/Filter";

type FilterSatelliteContextType = {
  filter: FilterSatellite;
  appliedFilter: FilterSatellite;
  setFilter: (filter: FilterSatellite) => void;
  applyFilter: () => void;
};

const defaultFilterSatellite: FilterSatellite = {
    name_satellite: '', 
    id_satellite: '',
    start_date_satellite: new Date(),
    end_date_satellite: new Date(),
    coverage_area: '',
    coverage_country: ''
};

const FilterSatelliteContext = createContext<FilterSatelliteContextType>({
  filter: defaultFilterSatellite,
  appliedFilter: defaultFilterSatellite,
  setFilter: () => {},
  applyFilter: () => {},
});

export const FiltroProvider = ({ children }: { children: React.ReactNode }) => {
  const [filter, setFilter] = useState<FilterSatellite>(defaultFilterSatellite);
  const [appliedFilter, setAppliedFilter] = useState<FilterSatellite>(defaultFilterSatellite);
  const [firstApply, setFirstApply] = useState(true);

  const applyFilter = () => {
  
    if (firstApply) {
      setAppliedFilter(defaultFilterSatellite);
      setFirstApply(false);
    } else {
      setAppliedFilter(filter);
    }
  };

  return (
    <FilterSatelliteContext.Provider value={{ filter, appliedFilter, setFilter, applyFilter }}>
      {children}
    </FilterSatelliteContext.Provider>
  );
};

export const useFilter = () => useContext(FilterSatelliteContext);
