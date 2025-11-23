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
import { extractPlatformName } from '../utils/extractPlatformName';
// 🚨 CORREÇÃO PRINCIPAL: O componente agora recebe o objeto ISatelliteData completo
interface SatelliteDetailViewProps {
  satellite: ISatelliteData;
}

const SatelliteDetailView: React.FC<SatelliteDetailViewProps> = ({ satellite }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'bands' | 'temporal' | 'metadata' | 'images'>('overview');

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
    metadataStac,
    items
  } = satellite;

  const hasImages = items?.some((item: any) => {
    const assets = item.assets || {};
    return (
      assets.thumbnail?.href ||
      assets.rendered?.href ||
      assets.visual?.href ||
      assets.overview?.href
    );
  });

  const { spectralIndices } = satellite;
  const colorMap: { [key: string]: string } = {
    NBR: "#f97316",
    NDVI: "#01A664",
    EVI: "#0397CD",
  };

  const spectralDescription: { [key: string]: string } = {
    NDVI: "Índice de Vegetação Normalizado — mede vigor da vegetação.",
    EVI: "Índice de Vegetação Aprimorado — mais sensível em áreas densas.",
    NBR: "Índice de Área Queimada — útil para detectar queimadas.",
  };


  const renderSpectralIndicesTags = () => {
    const attrs = spectralIndices?.attributes;

    console.log("spectralIndices?.attributes", attrs);

    // Se não for array, tenta transformar em array pelas keys do objeto
    const indices = Array.isArray(attrs)
      ? attrs
      : attrs && typeof attrs === "object"
        ? Object.keys(attrs)
        : [];

    if (indices.length === 0) return null;

    return indices.map(index => {
      const bgColor = colorMap[index] || "#6b7280";
      const description = spectralDescription[index] || "Índice Espectral";

      return (
        <span
          key={index}
          className="tag spectral-index"
          style={{ backgroundColor: bgColor, color: "#fff" }}
          data-tooltip={description}
        >
          {index}
        </span>
      );
    });
  };





  const renderMetadataStac = () => {
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

      case 'images':
        if (!hasImages) return null;
        return (
          <div className="data-field">
            <h4><FontAwesomeIcon icon={faTh} /> Imagens</h4>

            <div className="image-grid">
              {items.map((item: any, index: number) => {
                const assets = item.assets || {};

                const image =
                  assets.thumbnail?.href ||
                  assets.rendered?.href ||
                  assets.visual?.href ||
                  assets.overview?.href ||
                  null;

                if (!image) return null;

                return (
                  <div key={index} className="image-card">
                    <img src={image} alt={`Item ${index}`} />
                    <p className="image-date">
                      {item.properties?.datetime?.split("T")[0] || "Sem data"}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        );



      default:
        return null;
    }
  };


  const titleParts = title.split(' - ');
  const platformTag = extractPlatformName(titleParts);
  const resolutionTag = spatialResolution || 'N/A';
  const displayTitle = titleParts[0] ? titleParts.join(' - ') : title;


  return (
    <div className="satellite-data-view">
      <div className="header-data-view">
        <div className="left-content">
          <i className="fa-solid fa-satellite card-satellite-icon"></i>
          <h2>{displayTitle}</h2>
        </div>
        <div className="tags">
          {renderSpectralIndicesTags()}
          <span className="tag landsat">{platformTag.replace('LC', 'Landsat-')}</span>
          <span className="tag resolution">{resolutionTag}</span>
        </div>


      </div>

      <nav className="tabs-nav">

        <button
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Visão geral
        </button>
        <button
          className={`tab-button ${activeTab === 'bands' ? 'active' : ''}`}
          onClick={() => setActiveTab('bands')}
        >
          Bandas
        </button>
        {hasImages && (
          <button
            className={`tab-button ${activeTab === 'images' ? 'active' : ''}`}
            onClick={() => setActiveTab('images')}
          >
            Imagens
          </button>
        )}

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

export { SatelliteDetailView };