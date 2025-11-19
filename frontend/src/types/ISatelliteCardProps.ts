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