import type { IWTSSResponse } from "../types/IWTSSResponse";
import type { IStatisticsWTSS } from "../types/IStatisticsWTSS";
import type { IWTSSRequest } from "../types/IWTSSRequest";

export default function exportToCSV(
  timeSeriesData: IWTSSResponse,
  filterParams: IWTSSRequest,
  statisticsData: IStatisticsWTSS | null,
  filename: string
) {
  const rows: string[] = [];

  rows.push("--- Parâmetros de análise ---");
  rows.push(`Período:, ${filterParams.startDate} a ${filterParams.endDate}`);
  rows.push(`Satélites:, ${filterParams.coverages.join("; ")}`);
rows.push(
    `Coordenadas:, Lat: ${filterParams.latitude}, Lon: ${filterParams.longitude}`
  );
  rows.push("");

  if (statisticsData && statisticsData.statistics) {
    rows.push("--- Estatísticas dos índices ---");
    rows.push("Índice, Média, Máximo, Mínimo");

    Object.entries(statisticsData.statistics).forEach(([indexName, stats]) => {
      rows.push(
        `${indexName}, ${stats.avg.toFixed(3)}, ${stats.max.toFixed(
          3
        )}, ${stats.min.toFixed(3)}`
      );
    });
    rows.push("");
  }

  rows.push("--- Séries temporais ---");

  const headerParts = ["Date"];
  timeSeriesData.timeSeries.forEach((tsItem) => {
    tsItem.result.attributes.forEach((attr) => {
      headerParts.push(`${tsItem.query.coverage}_${attr.attribute}`);
    });
  });
  rows.push(headerParts.join(","));

  const timeline = timeSeriesData.timeSeries[0]?.result.timeline || [];

  timeline.forEach((date, index) => {
    const row: (string | number)[] = [date];

    timeSeriesData.timeSeries.forEach((tsItem) => {
      tsItem.result.attributes.forEach((attr) => {
        const value =
          attr.values[index] !== undefined ? attr.values[index] : "";
        row.push(value);
      });
    });

    rows.push(row.join(","));
  });

  const csvContent = rows.join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
