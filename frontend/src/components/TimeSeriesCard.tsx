import ReactApexChart from "react-apexcharts";
import type { ITimeSeriesCardProps } from "../types/ITimeSeriesCardProps";

const colorMap: { [key: string]: string } = {
  NBR: "#f97316",
  NDVI: "#01A664",
  EVI: "#0397CD",
};

const defaultColors = ["#eab308", "#34d399", "#ef4444", "#6366f1"];

export default function TimeSeriesCard({
  coverage,
  timeline,
  attributes,
}: ITimeSeriesCardProps) {
  const series = attributes.map((attr) => ({
    name: attr.attribute,
    data: attr.values,
  }));

  let defaultColorIndex = 0;
  const dynamicColors = attributes.map((attr) => {
    if (colorMap[attr.attribute]) {
      return colorMap[attr.attribute];
    }

    const color = defaultColors[defaultColorIndex % defaultColors.length];
    defaultColorIndex++; 
    return color;
  });

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "line",
      height: 350,
      background: "transparent",
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    colors: dynamicColors,
    stroke: { curve: "smooth", width: 3 },
    dataLabels: { enabled: false },
    markers: { size: 4 },
    title: {
      text: `${coverage}`,
      align: "left",
      style: {
        color: "#e0e0e0",
        fontSize: "16px",
        fontWeight: "600",
      },
    },
    grid: {
      borderColor: "rgba(255,255,255,0.05)",
      row: { colors: ["#1c1c1c", "transparent"], opacity: 0.3 },
    },
    xaxis: {
      categories: timeline,
      title: { text: "Data", style: { color: "#bfbfbf" } },
      labels: { style: { colors: "#bfbfbf" } },
    },
    yaxis: {
      title: { text: "Valor do índice", style: { color: "#bfbfbf" } },
      labels: { style: { colors: "#bfbfbf" } },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      labels: { colors: "#d9d9d9" },
    },
    tooltip: {
      theme: "dark",
    },
  };

  return (
    <div className="timeseries-container">
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={350}
        />
      </div>
    </div>
  );
}
