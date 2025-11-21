import "../index.css";
import "../styles/menuVisible.css";
import "../styles/timeSeriesView.css";
import "../styles/loadingSpinner.css";

import Menu from "../components/Menu";
import Header from "../components/Header";
import PanelContainer from "../components/PanelContainer";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { FiltroProvider } from "../context/FilterMapContext";
import TimeSeriesCard from "../components/TimeSeriesCard";
import { WTSSService } from "../services/WTSSService";

import type { IWTSSResponse } from "../types/IWTSSResponse";
import type { IWTSSRequest } from "../types/IWTSSRequest";
import type { IStatisticsWTSS } from "../types/IStatisticsWTSS";

import LoadingSpinner from "../components/LoadingSpinner";

export default function TimeSeriesView() {
  // const [isFiltroVisible, setIsFiltroVisible] = useState(true);

  const [timeSeriesData, setTimeSeriesData] = useState<IWTSSResponse | null>(
    null
  );
  const [statisticsData, setStatisticsData] = useState<IStatisticsWTSS | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const paramsFromRoute = location.state?.params as IWTSSRequest | undefined;
  const [isFiltroVisible, setIsFiltroVisible] = useState(!paramsFromRoute);
  const toggleFiltroVisibility = () => {
    setIsFiltroVisible((prev) => !prev);
  };

  useEffect(() => {
    if (!paramsFromRoute) {
      setError("Falha ao carregar as séries temporais");
      return;
    }

    const params: IWTSSRequest = {
      coverages: paramsFromRoute.coverages,
      startDate: paramsFromRoute.startDate,
      endDate: paramsFromRoute.endDate,
      latitude: paramsFromRoute.latitude,
      longitude: paramsFromRoute.longitude,
    };

    const service = new WTSSService();

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await service.getTimeSeriesCoverages(params);

        setTimeSeriesData(response.data as IWTSSResponse);
      } catch (err) {
        console.error(err);
        setError("Falha ao carregar as séries temporais.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [paramsFromRoute]);

  const noData =
    !isLoading &&
    error === null &&
    timeSeriesData !== null &&
    (!timeSeriesData.timeSeries || timeSeriesData.timeSeries.length === 0);

  useEffect(() => {
    if (!timeSeriesData) return;

    const service = new WTSSService();

    const fetchStatistics = async () => {
      try {
        const response = await service.getTimeSeriesStatistics(timeSeriesData);
        setStatisticsData(response.data as IStatisticsWTSS);
        /* console.log('Statistics Data:')
        console.log(statisticsData) */
      } catch (err) {
        console.error(err);
      }
    };

    fetchStatistics();
  }, [timeSeriesData]);

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

          <div className="content-area">
            {!noData && !error && (
              <PanelContainer
                title="Índices de vegetação"
                chips={
                  statisticsData
                    ? Object.entries(statisticsData.statistics).map(
                        ([key, stats]) => ({
                          key,
                          avg: stats.avg,
                        })
                      )
                    : []
                }
                onExport={() => console.log("export")}
                onDetails={() => console.log("detalhes")}
                defaultExpanded={false}
              ></PanelContainer>
            )}
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

              {error && (
                <div className="overlay-center" role="alert">
                  <div className="empty-card">
                    <p className="empty-title">{error}</p>

                    <button
                      className="back-to-map-btn"
                      onClick={() => navigate("/map")}
                    >
                      Voltar ao mapa
                    </button>
                  </div>
                </div>
              )}

              {noData && (
                <div className="overlay-center">
                  <div className="empty-card">
                    <p className="empty-title">
                      Nenhuma série temporal encontrada.
                    </p>

                    <button
                      className="back-to-map-btn"
                      onClick={() => navigate("/map")}
                    >
                      Voltar ao mapa
                    </button>
                  </div>
                </div>
              )}

              {!noData &&
                !error &&
                timeSeriesData?.timeSeries?.map((ts, index) => (
                  <TimeSeriesCard
                    key={index}
                    coverage={ts.query.coverage}
                    timeline={ts.result.timeline}
                    attributes={ts.result.attributes}
                  />
                ))}
            </div>
          </div>
        </div>
      </FiltroProvider>
    </div>
  );
}
