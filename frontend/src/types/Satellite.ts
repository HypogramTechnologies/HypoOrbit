
import type { MessageConfig } from "../types/MessageConfig";

export interface ISatellite {
  id: string;
  title: string;
}

export interface ISatelliteCardProps {
  id: string;
  title:string
  updatedTime?: string;
  gsd?: number;
  spectralIndices?: ISatelliteCardAttributesProps;
  hasTimeSeries: boolean;
  origin?: string;
}

export interface ISatelliteCardAttributesProps {
  attributes: string[];
}

export interface SatelliteFilterProps {
  setMessageConfig: React.Dispatch<React.SetStateAction<MessageConfig>>;
  origin: string;
  // satellites: ISatellite[];
  satellites: ISatelliteCardProps[];
  setFilteredSatellites: React.Dispatch<React.SetStateAction<ISatelliteCardProps[]>>;
}