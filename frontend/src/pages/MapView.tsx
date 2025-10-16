// MapView.tsx
import "../styles/mapView.css";
import "../styles/menuVisible.css";
import Mapa from "../components/Map";
import Menu from "../components/Menu";
import Header from "../components/Header";
import { useState } from "react";
import { FiltroProvider } from "../context/FilterMapContext";

export default function MapView() {
  const [isFiltroVisible, setIsFiltroVisible] = useState(true);

  const toggleFiltroVisibility = () => {
    setIsFiltroVisible((prev) => !prev);
  };

  return (
    <div className="page-container">
      <FiltroProvider>
        
        <Header
          onToggleFiltro={toggleFiltroVisibility}
          isFiltroVisible={isFiltroVisible}
          Title="Mapa"
        />

        <div
          className={`filtro-container ${
            isFiltroVisible ? "filtro-visible" : "filtro-hidden"
          }`}
        >
          <Menu />
        </div>

        <Mapa isFiltroVisible={isFiltroVisible} />

      </FiltroProvider>
    </div>
  );
}
