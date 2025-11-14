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
  activeTag: string;
  setActiveTag: React.Dispatch<React.SetStateAction<string>>;
  latitude: number | null;
  longitude: number | null;
  setLatitude: React.Dispatch<React.SetStateAction<number | null>>;
  setLongitude: React.Dispatch<React.SetStateAction<number | null>>;
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
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
  activeTag: "todos",
  setActiveTag: () => {},
  latitude: null,
  longitude: null,
  setLatitude: () => {},
  setLongitude: () => {},
  startDate: null,
  endDate: null,
  setStartDate: () => {},
  setEndDate: () => {},
});

export const FiltroProvider = ({ children }: { children: React.ReactNode }) => {
  const [filter, setFilter] = useState<FilterSatellite>(defaultFilterSatellite);
  const [appliedFilter, setAppliedFilter] = useState<FilterSatellite>(defaultFilterSatellite);
  const [firstApply, setFirstApply] = useState(true);
  const [selectedSatellites, setSelectedSatellites] = useState<SelectedSatellite[]>([]);
  const [activeTag, setActiveTag] = useState<string>("todos");

  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const applyFilter = () => {
    if (firstApply) {
      setAppliedFilter(defaultFilterSatellite);
      setFirstApply(false);
    } else {
      setAppliedFilter(filter);
    }
  };

  useEffect(() => {
    console.log("📡 Satélites selecionados:", selectedSatellites);
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
        activeTag,
        setActiveTag,
        latitude,
        longitude,
        setLatitude,
        setLongitude,
        startDate,
        endDate,
        setStartDate,
        setEndDate,
      }}
    >
      {children}
    </FilterSatelliteContext.Provider>
  );
};

export const useFilter = () => useContext(FilterSatelliteContext);
