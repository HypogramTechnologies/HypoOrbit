import "../index.css";
import "../styles/menuVisible.css";
import Menu from "../components/Menu";
import SatelliteList from "../components/SatelliteList";
import Header from "../components/Header";
import { useState } from "react";
import { FiltroProvider as FilterMapProvider } from "../context/FilterMapContext";
import { FiltroProvider as FilterSatelliteProvider } from "../context/FilterSatelliteContext"; 

export default function SatelliteView() {
  const [isFiltroVisible, setIsFiltroVisible] = useState(true);

  const toggleFiltroVisibility = () => {
    setIsFiltroVisible((prev) => !prev);
  };

  return (
    <div className="container">
      <FilterMapProvider>
        <Header
          onToggleFiltro={toggleFiltroVisibility}
          isFiltroVisible={isFiltroVisible}
          Title="Lista de satélites"
        />

        <div className="main-content">
          <div
            className={`filtro-container ${isFiltroVisible ? "filtro-visible" : "filtro-hidden"
              }`}
          >
            <Menu />
          </div>
          <FilterSatelliteProvider>
            <SatelliteList isFiltroVisible={isFiltroVisible} origin='SatelliteView' coordinates={[]}/>
          </FilterSatelliteProvider>
        </div>
      </FilterMapProvider>
    </div>

  );
}

