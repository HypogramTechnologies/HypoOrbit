import React, { createContext, useContext, useState } from "react";
import type { FilterMap } from "../types/Filter";

type FilterMapContextType = {
  filter: FilterMap;
  appliedFilter: FilterMap;
  setFilter: (filter: FilterMap) => void;
  applyFilter: () => void;
};

const defaultFilterMap: FilterMap = {
  latitude: -15.793889,
  longitude: -47.882778,
};

const FilterMapContext = createContext<FilterMapContextType>({
  filter: defaultFilterMap,
  appliedFilter: defaultFilterMap,
  setFilter: () => {},
  applyFilter: () => {},
});

export const FiltroProvider = ({ children }: { children: React.ReactNode }) => {
  const [filter, setFilter] = useState<FilterMap>(defaultFilterMap);
  const [appliedFilter, setAppliedFilter] = useState<FilterMap>(defaultFilterMap);
  const [firstApply, setFirstApply] = useState(true);

  const applyFilter = () => {
  
    if (firstApply) {
      setAppliedFilter(defaultFilterMap);
      setFirstApply(false);
    } else {
      setAppliedFilter(filter);
    }
  };

  return (
    <FilterMapContext.Provider value={{ filter, appliedFilter, setFilter, applyFilter }}>
      {children}
    </FilterMapContext.Provider>
  );
};

export const useFilter = () => useContext(FilterMapContext);
