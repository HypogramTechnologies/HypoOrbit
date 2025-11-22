import { useState, useEffect } from "react";
import type { ISatelliteCardProps } from "../types/ISatelliteCardProps";
import SatelliteCard from "./SatelliteCard";
import { StacService } from "../services/StacService";
import "../styles/satelliteList.css";
import type { SatelliteProps } from "../types/SatelliteProps";
import SatelliteFilter from "./SatelliteFilter";
import Message from "../components/Message";
import { TypeMessage } from "../types/MessageConfig";
import type { MessageConfig } from "../types/MessageConfig";
import LoadingSpinner from "./LoadingSpinner";

const SatelliteList: React.FC<SatelliteProps> = ({ isFiltroVisible, origin, coordinates }) => {
  const [satellites, setSatellites] = useState<ISatelliteCardProps[]>([]);
  const [filteredSatellites, setFilteredSatellites] = useState<ISatelliteCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [messageConfig, setMessageConfig] = useState<MessageConfig>({
    type: TypeMessage.Info,
    message: "",
    show: false,
  });

  const service = new StacService();

  useEffect(() => {
    setLoading(true);

    const fetchSatellites =
      coordinates && coordinates.length > 0
        ? service.getCollectionsByCoordinates(coordinates)
        : service.getInfoCollection();

    fetchSatellites
      .then((response) => {
        const data = response.data as { listCollection: ISatelliteCardProps[] };
        const normalizedSatellites = (data?.listCollection || []).map((sat) => ({
          ...sat,
          hasTimeSeries: sat.hasTimeSeries ?? false,
        }));

        setSatellites(normalizedSatellites);
        setFilteredSatellites(normalizedSatellites);
      })
      .catch((err) => {
        console.error("Erro na requisição:", err);
        setMessageConfig({
          type: TypeMessage.Error,
          message: "Erro ao carregar os satélites.",
          show: true,
        });
      })
      .finally(() => setLoading(false));
  }, [coordinates]);

  const getContainerClassName = () => {
    if (loading) return "satellite-loading-container";

    return origin === "Map"
      ? "satellite-list-container-hidden"
      : isFiltroVisible
      ? "satellite-list-container-visible"
      : "satellite-list-container-hidden";
  };

  return (
    <div className="satellite-list-container">
      {messageConfig.show && (
        <Message
          {...messageConfig}
          onClose={() => setMessageConfig({ ...messageConfig, show: false })}
        />
      )}

      <div
        className={
          origin === "Map"
            ? "satellite-filter-list-container-hidden"
            : isFiltroVisible
            ? "satellite-filter-list-container-visible"
            : "satellite-filter-list-container-hidden"
        }
      >
        <SatelliteFilter
          satellites={satellites}
          setFilteredSatellites={setFilteredSatellites}
          setMessageConfig={setMessageConfig}
          origin={origin}
        />
      </div>

      {/* List / loading / empty */}
      <div className={getContainerClassName()}>
        {loading ? (
          <LoadingSpinner />
        ) : filteredSatellites.length === 0 ? (
          /* Empty message styled like TimeSeries (no button) */
          <div className="empty-message" aria-live="polite">
            Nenhum satélite encontrado.
          </div>
        ) : (
          filteredSatellites.map((item) => (
            <SatelliteCard
              key={item.id}
              id={item.id}
              title={item.title}
              updatedTime={item.updatedTime}
              gsd={item.gsd}
              spectralIndices={item.spectralIndices}
              hasTimeSeries={item.hasTimeSeries ?? false}
              origin={origin}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SatelliteList;
