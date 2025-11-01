import type { IWTSSRequest } from "../types/IWTSSRequest";
import api from "./api";

export class WTSSService {
  async getTimeSeriesCoverages(params: IWTSSRequest) {
    const data = await api.post("/wtss/time_series_coverages", params);
    return data;
  }
}
