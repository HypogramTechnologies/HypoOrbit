import type { SatelliteData } from "./SatelliteData";

export interface ISatelliteCardProps {
  id: string;
  title:string
  updatedTime?: string;
  gsd?: number;
  spectralIndices?: ISatelliteCardAttributesProps;
  hasTimeSeries: boolean;
  origin?: string;
  satelliteData?:SatelliteData;
}

export interface ISatelliteCardAttributesProps {
  attributes: string[];
}