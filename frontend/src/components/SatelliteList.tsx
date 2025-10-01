import { useState, useEffect } from 'react';
import type { ISatelliteCardProps } from '../types/ISatelliteCardProps';
import SatelliteCard from './SatelliteCard';
import { StacService } from '../services/StacService';

const SatelliteList: React.FC = () => {
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
    <div style={listStyle}>
      {satellite.map(item => (
        <SatelliteCard
          key={item.id}                        
          id={item.id}
          updatedTime={item.updatedTime}
          gsd={item.gsd}
          spectralIndices={item.spectralIndices}
        />
      ))}
    </div>
  );
};

const listStyle: React.CSSProperties = {
    height: '80vh',         
    overflowY: 'auto',     
    padding: '1rem',
    boxSizing: 'border-box',
    border: '1px solid #ccc', 
  };

export default SatelliteList;


