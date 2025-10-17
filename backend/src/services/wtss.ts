import wtss from "../config/wtss";
import { IWTSSCoverages, IWTSSTimesSeries, ICoverageMetadata } from "../types/IWTSSCoverages";


export class WTSSService {
  async getCoverages() {
    const response = await wtss.get<IWTSSCoverages>("/coverages");
    return response.data as IWTSSCoverages;
  }

  async getCoverageDetails(coverage: string) {
    const response = await wtss.get<ICoverageMetadata>(`/${coverage}`);
    return response.data;
  }

  async getTimeSeries(
    coverage: string,
    attributes: string[],
    startDate: Date,
    endDate: Date,
    latitude: number,
    longitude: number
  ) {
    const response = await wtss.get<IWTSSTimesSeries>(
      `/time_series?coverage=${coverage}&attributes=${attributes.join(
        ","
      )}&start_date=${startDate.toISOString().split("T")[0]}&end_date=${
        endDate.toISOString().split("T")[0]
      }&latitude=${latitude}&longitude=${longitude}`
    );
    return response.data;
  }
}
