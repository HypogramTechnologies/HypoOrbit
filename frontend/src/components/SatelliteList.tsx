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
    console.log('coordinates',coordinates);
    const fetchSatellites =
      coordinates && coordinates.length > 0
        ? service.getCollectionsByCoordinates(coordinates)
        : service.getInfoCollection();
    console.log('fetchSatellites',fetchSatellites)
    fetchSatellites
      .then((response) => {
        const data = response.data as { listCollection: ISatelliteCardProps[] };
        console.log('data',data);
        const normalizedSatellites = data.listCollection.map((sat) => ({
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

  return (
    <div className="satellite-list-container">
      {messageConfig.show && <Message {...messageConfig} />}

     
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

      
      <div
        className={
          origin === "Map"
            ? "satellite-list-container-hidden"
            : isFiltroVisible
            ? "satellite-list-container-visible"
            : "satellite-list-container-hidden"
        }
      >
        {loading ? (
          <p style={{ textAlign: "center", padding: "20px" }}>Carregando satélites...</p>
        ) : filteredSatellites.length === 0 ? (
          <p style={{ textAlign: "center", padding: "20px" }}>Nenhum satélite encontrado.</p>
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
              
            />
            
          ))
        )}
      </div>
    </div>
  );
};

export default SatelliteList;
