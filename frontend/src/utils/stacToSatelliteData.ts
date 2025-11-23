import type { ISatelliteData, ISpectralBand, IStacMetadata } from "../types/SatelliteData";

const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A";
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  } catch {
    return dateString.split("T")[0] || 'N/A';
  }
};

const calculatePeriod = (startDateISO: string, endDateISO: string): string => {
  try {
    const startYear = new Date(startDateISO).getUTCFullYear();
    const endYear = new Date(endDateISO).getUTCFullYear();
    const years = endYear - startYear;

    if (years === 1){
      return `${years} ano de dados disponíveis`;
    }else{
      return `${years} anos de dados disponíveis`;
    }

  } catch {
    return 'N/A';
  }
};

export const stacToSatelliteData = (stacData: any, itemsData: any[]): ISatelliteData => {
  const {
    id,
    title,
    description,
    extent,
    properties,
    license,
    providers
  } = stacData;

  const resolution_x = properties?.['eo:bands']?.[0]?.['resolution_x'];
  const spatialResolution = resolution_x ? `${resolution_x}m` : 'N/A';
  
  const providerName = providers?.[0]?.name || 'N/A';
  
  const bbox = extent?.spatial?.bbox?.[0];
  const spatialCoverage = bbox 
    ? `Tipo: Polygon \n[${bbox[0]}, ${bbox[1]}, ${bbox[2]}, ${bbox[3]}]` 
    : 'N/A';

  // --- Bandas Espectrais ---
  const spectralBands: ISpectralBand[] = (properties?.['eo:bands'] || [])
    .map((band: any) => {
      console.log('band',band);
      const name = band.common_name?.toUpperCase() || band.name || 'Banda Desconhecida';
      const descriptionText = band.description || 'N/A';
      
      let wavelength = 'N/A';
      
      if (band.center_wavelength) {
        wavelength = `${band.center_wavelength} µm`;
      } 
      else if (band.min_wavelength && band.max_wavelength) {
        wavelength = `${band.min_wavelength}-${band.max_wavelength} µm`;
      } 
      else if (band.min_wavelength) {
        wavelength = `> ${band.min_wavelength} µm`;
      } 
      else if (band.max_wavelength) {
        wavelength = `< ${band.max_wavelength} µm`;
      }

      return {
        name: `${name} - ${descriptionText}`,
        wavelength,
      };
    });

  const temporalInterval = extent?.temporal?.interval?.[0];
  const startDateISO = temporalInterval?.[0] || '';
  const endDateISO = temporalInterval?.[1] || '';

  const startDate = startDateISO ? formatDate(startDateISO) : 'N/A';
  const endDate = endDateISO ? formatDate(endDateISO) : 'N/A';
  const totalPeriod = calculatePeriod(startDateISO, endDateISO);
  
  const platform = properties?.platform?.[0] || stacData.summaries?.platform?.[0] || 'N/A';
  const instrument = properties?.instruments?.[0] || stacData.summaries?.instruments?.[0] || 'N/A';
  const processingLevel = providers?.[0]?.['processing:level'] || 'N/A';
  const cloudCoverMax = properties?.['cloudcover:max'] ?? 'N/A';
  
  const metadataStac: IStacMetadata = {
    id: id || 'N/A',
    license: license || 'N/A',
    additionalMetadata: {
      platform: `"${platform}"`,
      instrument: `"${instrument}"`,
      processingLevel: `"${processingLevel}"`,
      CloudcoverMax: cloudCoverMax,
    }
  };

  return {
    title: title || 'N/A',
    description: description || 'Sem descrição detalhada disponível.',
    spatialResolution,
    provider: providerName,
    spatialCoverage,
    spectralBands,
    startDate,
    endDate,
    totalPeriod,
    metadataStac,
    items: itemsData || [],
  };
};
