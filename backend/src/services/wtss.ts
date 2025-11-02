import wtss from "../config/wtss";
import {
  IWTSSCoverages,
  IWTSSTimesSeries,
  ICoverageMetadata,
  IBand,
  IAttributesCoverages,
} from "../types/IWTSSCoverages";

export class WTSSService {
  // ✅ GET /list_coverages
  async getCoverages() {
    const response = await wtss.get<IWTSSCoverages>("/list_coverages");
    return response.data as IWTSSCoverages;
  }

  // ✅ GET /:coverage
  async getCoverageDetails(coverage: string) {
    const response = await wtss.get<ICoverageMetadata>(`/${coverage}`);
    return response.data;
  }

  // ✅ GET /time_series
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

  // ✅ Retorna apenas bandas de interesse ordenadas (NDVI, EVI, NBR)
  async getAttributesCoverages(coverages: string[]) {
    const coveragesAttributes: IAttributesCoverages[] = [];
    for (const coverage of coverages) {
      const data = await this.getCoverageDetails(coverage);
      if (data && data.bands) {
        coveragesAttributes.push({
          coverage: coverage,
          attributes: data.bands
            .sort((a: IBand, b: IBand) => a.name.localeCompare(b.name))
            .map((band: IBand) => band.name)
            .filter((name: string) => ["NDVI", "EVI", "NBR"].includes(name)),
        });
      }
    }
    return coveragesAttributes;
  }

  // GET /coverage/:coverage/update-time
  async getCoverageUpdateTime(coverage: string): Promise<string> {
    const data = await this.getCoverageDetails(coverage);
    const timeline: string[] = (data as any)?.timeline;
    if (timeline && timeline.length > 0) {
      return timeline[timeline.length - 1] ?? "Data de atualização não encontrada";
    }
    const updateTime =
      (data as any)?.dateRange?.end ||
      (data as any)?.date_range?.end ||
      (data as any)?.lastUpdate ||
      (data as any)?.last_update;

    return updateTime || "Data de atualização não encontrada";
  }
}
