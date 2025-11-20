// src/components/SatelliteDetailView.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faInfoCircle,
  faTh,
  faClock,
  faFileAlt
} from '@fortawesome/free-solid-svg-icons';
// Importa o tipo de dado completo que será recebido
import type { ISatelliteData, ISpectralBand } from '../types/SatelliteData';
import '../styles/satelliteDetailView.css'; 

// 🚨 CORREÇÃO PRINCIPAL: O componente agora recebe o objeto ISatelliteData completo
interface SatelliteDetailViewProps {
  satellite: ISatelliteData; // Recebe os dados já mapeados
  onClose: () => void;
}

// Ícones (Definidos anteriormente)
// ... (faInfoCircle, faTh, faClock, faFileAlt, etc.)

const SatelliteDetailView: React.FC<SatelliteDetailViewProps> = ({ satellite, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'bands' | 'temporal' | 'metadata'>('overview');
  
  // NENHUMA LÓGICA DE LOADING OU useEffect É NECESSÁRIA!
  // Os dados vêm diretamente do prop `satellite`.

  // Desestruturação de dados garantida
  const {
    title,
    description,
    spatialResolution,
    provider,
    spatialCoverage,
    spectralBands,
    startDate,
    endDate,
    totalPeriod,
    metadataStac
  } = satellite; // Usa o prop diretamente
  
  // ... (renderMetadataStac e TabContent permanecem iguais)
  const renderMetadataStac = () => {
    // ... lógica de renderização de Metadados ...
    const additionalMeta = Object.entries(metadataStac.additionalMetadata)
      .map(([key, value]) => {
        let displayValue;
        if (typeof value === 'string' && value.startsWith('"') && value.endsWith('"')) {
             displayValue = `<span class="value">${value}</span>`;
        } else if (typeof value === 'number' || typeof value === 'boolean') {
            displayValue = `<span class="number">${value}</span>`;
        } else {
            displayValue = value;
        }

        return `\t  <strong>"${key}"</strong>: ${displayValue}`;
      })
      .join(',\n');
      
    const codeBlockContent = `
{
  <strong>"ID"</strong>: <span class="value">"${metadataStac.id}"</span>
  <strong>"Licenca"</strong>: <span class="value">"${metadataStac.license}"</span>
  <strong>"Metadados Adicionais"</strong>: {
${additionalMeta}
  }
}
    `.trim();

    return (
      <div className="metadata-stac data-field">
        <h4><FontAwesomeIcon icon={faFileAlt} /> Metadados STAC</h4>
        <div 
          className="code-block" 
          dangerouslySetInnerHTML={{ __html: codeBlockContent }}
        />
      </div>
    );
  };
  
  const TabContent: React.FC = () => {
    // ... lógica de renderização das Tabs ...
    switch (activeTab) {
      case 'overview':
        return (
          <>
            <div className="data-field">
              <h4><FontAwesomeIcon icon={faInfoCircle} /> Descrição</h4>
              <p>{description}</p>
            </div>
            <div className="temporal-info"> 
              <div className="temporal-block data-field">
                <p>Resolução espacial</p>
                <strong>{spatialResolution}</strong>
              </div>
              <div className="temporal-block data-field">
                <p>Provedor</p>
                <strong>{provider}</strong>
              </div>
            </div>
            <div className="data-field">
              <h4>Cobertura Espacial</h4>
              <p>{spatialCoverage}</p>
            </div>
          </>
        );
      case 'bands':
        return (
          <>
            <div className="data-field">
              <h4><FontAwesomeIcon icon={faTh} /> Bandas Espectrais</h4>
              <div className="band-list">
                {spectralBands.map((band: ISpectralBand, index) => (
                  <div key={index} className="band-item">
                    <div className="band-info">
                      <strong>{band.name.split(' - ')[0]}</strong>
                      <span>{band.name.split(' - ')[1] || 'Banda Espectral'}</span>
                    </div>
                    <span className="wavelength">{band.wavelength}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        );
      case 'temporal':
        return (
          <>
            <div className="data-field">
              <h4><FontAwesomeIcon icon={faClock} /> Cobertura Temporal</h4>
              <div className="temporal-info">
                <div className="temporal-block">
                  <p>Data Inicial</p>
                  <strong>{startDate}</strong>
                </div>
                <div className="temporal-block">
                  <p>Data Final</p>
                  <strong>{endDate}</strong>
                </div>
              </div>
              <div className="total-period">
                Período total: {totalPeriod}
              </div>
            </div>
          </>
        );
      case 'metadata':
        return renderMetadataStac();
      default:
        return null;
    }
  };


  const titleParts = title.split(' - ');
  const platformMatch = titleParts.find(part => part.includes('LC'));
  const platformTag = platformMatch?.match(/(LC\d)/)?.[0] || 'Plataforma'; 
  const resolutionTag = spatialResolution || 'N/A';
  const displayTitle = titleParts[0] ? titleParts.join(' - ') : title;


  return (
    <div className="satellite-data-view">
      <div className="header">
        <i className="fa-solid fa-satellite card-satellite-icon"></i> 
        <h2>{displayTitle}</h2>
        <div className="tags">
          <span className="tag landsat">{platformTag.replace('LC', 'Landsat-')}</span>
          <span className="tag resolution">{resolutionTag}</span>
        </div>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
      </div>

      <nav className="tabs-nav">
        {/* ... botões de aba ... */}
        <button 
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Visão Geral
        </button>
        <button 
          className={`tab-button ${activeTab === 'bands' ? 'active' : ''}`}
          onClick={() => setActiveTab('bands')}
        >
          Bandas
        </button>
        <button 
          className={`tab-button ${activeTab === 'temporal' ? 'active' : ''}`}
          onClick={() => setActiveTab('temporal')}
        >
          Temporal
        </button>
        <button 
          className={`tab-button ${activeTab === 'metadata' ? 'active' : ''}`}
          onClick={() => setActiveTab('metadata')}
        >
          Metadados
        </button>
      </nav>

      <div className="tab-content">
        <TabContent />
      </div>
    </div>
  );
};

export { SatelliteDetailView }; // Exporta a nova interface de props