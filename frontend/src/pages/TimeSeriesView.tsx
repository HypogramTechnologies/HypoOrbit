import "../index.css";
import "../styles/menuVisible.css";
import Menu from "../components/Menu";
import Header from "../components/Header";
import { useState } from "react";
import { FiltroProvider } from "../context/FilterMapContext";

export default function TimeSeriesView() {
  const [isFiltroVisible, setIsFiltroVisible] = useState(true);

  const toggleFiltroVisibility = () => {
    setIsFiltroVisible((prev) => !prev);
  };

  return (
    <div className="container">
      <FiltroProvider>
        <Header
          onToggleFiltro={toggleFiltroVisibility}
          isFiltroVisible={isFiltroVisible}
          Title="Séries temporais"
        />

        <div className="main-content">
          <div
            className={`filtro-container ${isFiltroVisible ? "filtro-visible" : "filtro-hidden"
              }`}
          >
            <Menu />
          </div>
        </div>
      </FiltroProvider>
    </div>

  );
}

