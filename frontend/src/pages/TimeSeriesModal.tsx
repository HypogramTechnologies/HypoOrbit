import "../index.css";
import "../styles/menuVisible.css";
import "../styles/timeSeriesModal.css";
import "../styles/loadingSpinner.css"; 

import { useState, useEffect } from "react";
import TimeSeriesCard from "../components/TimeSeriesCard";
import { WTSSService } from "../services/WTSSService";
import type { IWTSSResponse } from "../types/IWTSSResponse";
import type { IWTSSRequest } from "../types/IWTSSRequest";

interface TimeSeriesModalProps {
  params: IWTSSRequest;
}

export default function TimeSeriesModal({ params }: TimeSeriesModalProps) {
  const [timeSeriesData, setTimeSeriesData] = useState<IWTSSResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (
      !params?.coverages?.length ||
      !params.startDate ||
      !params.endDate ||
      !params.latitude ||
      !params.longitude
    ) {
      console.warn("Faltam parâmetros para a requisição WTSS:", params);
      return;
    }

    const fetchData = async () => {
      console.log("Parâmetros WTSS recebidos no modal:", params);

      const service = new WTSSService();

      try {
        setIsLoading(true);
        setError(null);

        const response = await service.getTimeSeriesCoverages(params);

        if (!response || !response.data) {
          throw new Error("Resposta inválida do serviço WTSS");
        }

        console.log("WTSS Response:", response.data);
        setTimeSeriesData(response.data as IWTSSResponse);
      } catch (err) {
        console.error("Erro ao carregar séries temporais:", err);
        setError("Falha ao carregar as séries temporais.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params]);

  const noData =
    !isLoading &&
    error === null &&
    timeSeriesData !== null &&
    (!timeSeriesData.timeSeries || timeSeriesData.timeSeries.length === 0);

  return (
    <div className="container">
      <div className="main-content">
        <div className="timeseries-list-container">
          {isLoading && (
            <div><></> /* placeholder to keep markup simple; LoadingSpinner is rendered elsewhere in your app */</div>
          )}

          {error && (
            <div className="overlay-center" role="alert">
              <div className="empty-card">
                <p className="empty-title">{error}</p>
                <button
                  className="back-to-map-btn"
                  onClick={() => (window.location.href = "/map")}
                >
                  Voltar ao mapa
                </button>
              </div>
            </div>
          )}

          {noData && (
            <div className="overlay-center" aria-hidden={false}>
              <div className="empty-card">
                <p className="empty-title">Nenhuma série temporal encontrada.</p>
                <button
                  className="back-to-map-btn"
                  onClick={() => (window.location.href = "/map")}
                >
                  Voltar ao mapa
                </button>
              </div>
            </div>
          )}

          {timeSeriesData &&
            timeSeriesData.timeSeries &&
            timeSeriesData.timeSeries.length > 0 &&
            timeSeriesData.timeSeries.map((ts, index) => (
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
  );
}
