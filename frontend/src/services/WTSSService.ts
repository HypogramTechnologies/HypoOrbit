import type { IWTSSRequest } from "../types/IWTSSRequest";
import type { IWTSSResponse } from "../types/IWTSSResponse";
import api from "./api";

export class WTSSService {
  async getTimeSeriesCoverages(params: IWTSSRequest) {
    const data = await api.post("/wtss/time_series_coverages", params);
    return data;
  }

  async getTimeSeriesStatistics(params: IWTSSResponse) {
    const data = await api.post("/wtss/statistics", params);
    return data;
  }
}
