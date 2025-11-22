import type { IWTSSResponse } from "../types/IWTSSResponse";
import type { IStatisticsWTSS } from "../types/IStatisticsWTSS";
import type { IWTSSRequest } from "../types/IWTSSRequest";
import exportToCSV from "./exportTimeSeriesToCsv";
import exportToXLSX from "./exportTimeSeriesToXlsx";

type ExportFormat = "xlsx" | "csv";

export default function exportTimeSeriesData(
  format: ExportFormat,
  timeSeriesData: IWTSSResponse,
  filterParams: IWTSSRequest,
  statisticsData: IStatisticsWTSS | null,
) {
  if (format === "csv") {
    exportToCSV(
      timeSeriesData,
      filterParams,
      statisticsData,
      "time_series_data.csv"
    );
  } else if (format === "xlsx") {
    exportToXLSX(
      timeSeriesData,
      filterParams,
      statisticsData,
      "time_series_data.xlsx"
    );
  } else {
    console.error("Formato de exportação desconhecido:", format);
  }
}

