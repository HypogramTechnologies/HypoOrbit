import type { ISatelliteCardAttributesProps } from "./ISatelliteCardProps";

export interface ISpectralBand {
  name: string;
  wavelength: string;
}

export interface IStacMetadata {
  id: string;
  license: string;
  additionalMetadata: Record<string, string | number | boolean>;
}

export interface ISatelliteData {
  title: string;
  description: string;
  spatialResolution: string;
  provider: string;
  spatialCoverage: string;
  spectralBands: ISpectralBand[];
  startDate: string;
  endDate: string;
  totalPeriod: string;
  metadataStac: IStacMetadata;
  spectralIndices?: ISatelliteCardAttributesProps;
  items: any[]; 
}