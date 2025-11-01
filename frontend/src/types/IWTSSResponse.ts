export interface IWTSSResponse {
  timeSeries: {
    query: { coverage: string };
    result: {
      attributes: { attribute: string; values: number[] }[];
      timeline: string[];
    };
  }[];
}