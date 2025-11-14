import "../index.css";
import "../styles/menuVisible.css";
import "../styles/timeSeriesModal.css";

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
    // Evita chamada sem parâmetros válidos
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

  return (
    <div className="container">
      <div className="main-content">
        <div className="timeseries-list-container">
          {isLoading && <p>Carregando dados...</p>}
          {error && <p className="error">{error}</p>}

          {timeSeriesData?.timeSeries?.length ? (
            timeSeriesData.timeSeries.map((ts, index) => (
              <TimeSeriesCard
                key={index}
                coverage={ts.query.coverage}
                timeline={ts.result.timeline}
                attributes={ts.result.attributes}
              />
            ))
          ) : (
            !isLoading && !error && <p>Nenhuma série temporal encontrada.</p>
          )}
        </div>
      </div>
    </div>
  );
}
