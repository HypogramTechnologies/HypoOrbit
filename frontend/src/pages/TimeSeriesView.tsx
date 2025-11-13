import "../index.css";
import "../styles/menuVisible.css";
import "../styles/timeSeriesView.css";
import Menu from "../components/Menu";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import { FiltroProvider } from "../context/FilterMapContext";
import TimeSeriesCard from "../components/TimeSeriesCard";
import { WTSSService } from "../services/WTSSService";
import type { IWTSSResponse } from "../types/IWTSSResponse";
import type { IWTSSRequest } from "../types/IWTSSRequest";
import LoadingSpinner from "../components/LoadingSpinner";

export default function TimeSeriesView() {
  const [isFiltroVisible, setIsFiltroVisible] = useState(true);
  const [timeSeriesData, setTimeSeriesData] = useState<IWTSSResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleFiltroVisibility = () => {
    setIsFiltroVisible((prev) => !prev);
  };

  useEffect(() => {
    const params: IWTSSRequest = {
      coverages: [
        "CBERS4-MUX-2M-1",
        "CBERS4-WFI-16D-2",
        "CBERS-WFI-8D-1",
        "LANDSAT-16D-1",
        "mod11a2-6.1",
        "mod13q1-6.1",
        "myd11a2-6.1",
        "myd13q1-6.1",
        "S2-16D-2"
      ],
      startDate: "2022-09-01",
      endDate: "2024-03-01",
      latitude: "-15.5898283072306",
      longitude: "-47.5288794633165",
    };

    const service = new WTSSService();

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await service.getTimeSeriesCoverages(params);
        console.log(response);
        setTimeSeriesData(response.data as IWTSSResponse);
      } catch (err) {
        console.error(err);
        setError("Falha ao carregar as séries temporais.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
            className={`filtro-container ${
              isFiltroVisible ? "filtro-visible" : "filtro-hidden"
            }`}
          >
            <Menu />
          </div>

          <div
            className={
              isLoading 
                ? "timeseries-loading-container"
                : isFiltroVisible
                ? "timeseries-list-container-visible"
                : "timeseries-list-container-hidden"
            }
          >
            {isLoading && <LoadingSpinner />}
            {error && <p className="error">{error}</p>}

            {!isLoading && timeSeriesData?.timeSeries.map((ts, index) => (
              <TimeSeriesCard
                key={index}
                coverage={ts.query.coverage}
                timeline={ts.result.timeline}
                attributes={ts.result.attributes}
              />
            ))}
          </div>
        </div>
      </FiltroProvider>
    </div>
  );
}