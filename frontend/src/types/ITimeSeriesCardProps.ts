
export interface ITimeSeriesCardProps {
  coverage: string;
  timeline: string[];
  attributes: {
    attribute: string;
    values: number[];
  }[];
}