import { useState, useEffect } from 'react';
import type { ISatelliteCardProps } from '../types/ISatelliteCardProps';
import SatelliteCard from './SatelliteCard';
import { StacService } from '../services/StacService';
import "../styles/satelliteList.css";
import type { SatelliteProps } from '../types/SatelliteProps';

const SatelliteList: React.FC<SatelliteProps> = ({ isFiltroVisible }) => {
// const SatelliteList: React.FC = () => {
  const [satellite, setSatellite] = useState<ISatelliteCardProps[]>([]);
  const service = new StacService();

  useEffect(() => {
    service.getInfoCollection()
      .then((response) => {

        const data = response.data as { listCollection: ISatelliteCardProps[] };
        setSatellite(data.listCollection);
      })
      .catch(err => console.error("Erro na requisição:", err));
  }, []);

  return (
    <div className={`${isFiltroVisible ? "satellite-list-container-visible" : "satellite-list-container-hidden"
              }`}>
      {satellite.map(item => (
        <SatelliteCard
          key={item.id}                        
          id={item.id}
          title={item.title}
          updatedTime={item.updatedTime}
          gsd={item.gsd}
          spectralIndices={item.spectralIndices}
        />
      ))}
    </div>
  );
};



export default SatelliteList;


