export interface ISatelliteCardProps {
  id: string;
  title:string
  updatedTime?: string;
  gsd?: number;
  spectralIndices?: string[];
  hasTimeSeries: boolean;
  origin?: string;
}