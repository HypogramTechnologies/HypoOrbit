import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import "../styles/TimeSeriesCard.css";

export default function TimeSeriesCard() {

  const [state] = useState({
    series: [
      {
        name: "EVI",
        data: [28, 29, 33, 36, 32, 32, 33],
      },
      {
        name: "NBR",
        data: [12, 11, 14, 18, 17, 13, 13],
      },
      {
        name: "NDVI",
        data: [25, 27, 30, 31, 29, 30, 32],
      },
    ],
    options: {
      chart: {
        type: "line",
        height: 350,
        background: "transparent",
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
          },
        },
        zoom: {
          enabled: true,
        },
      },

      colors: ["#0f99bf", "#f97316", "#0cd9a6"],

      stroke: {
        curve: "smooth",
        width: 3,
      },

      dataLabels: {
        enabled: false, 
      },

      markers: {
        size: 4,
        colors: ["#181818"],
        strokeColors: ["#0f99bf", "#f97316", "#0cd9a6"],
        strokeWidth: 2,
        hover: { size: 6 },
      },

      title: {
        text: "Média de Temperaturas — 2013",
        align: "left",
        style: {
          color: "#e0e0e0",
          fontSize: "16px",
          fontWeight: "600",
        },
      },

      grid: {
        borderColor: "rgba(255,255,255,0.05)",
        row: {
          colors: ["#1c1c1c", "transparent"],
          opacity: 0.3,
        },
      },

      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        title: {
          text: "Mês",
          style: { color: "#bfbfbf", fontSize: "13px" },
        },
        labels: {
          style: {
            colors: "#bfbfbf",
            fontSize: "12px",
          },
        },
        axisBorder: { color: "rgba(255,255,255,0.1)" },
        axisTicks: { color: "rgba(255,255,255,0.1)" },
      },

      yaxis: {
        title: {
          text: "Temperatura (°C)",
          style: { color: "#bfbfbf", fontSize: "13px" },
        },
        labels: {
          style: {
            colors: "#bfbfbf",
            fontSize: "12px",
          },
        },
        min: 5,
        max: 40,
      },

      legend: {
        position: "top",
        horizontalAlign: "right",
        labels: {
          colors: "#d9d9d9",
          useSeriesColors: false,
        },
        fontSize: "13px",
      },

      tooltip: {
        theme: "dark",
        style: {
          fontSize: "13px",
        },
        x: {
          show: true,
        },
      },
    },
  });

  return (
    <div className="timeseries-container">
      <div className="timeseries-header">
        <h3 className="timeseries-title">S2-16D-2</h3>
      </div>

      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="line"
          height={350}
        />
      </div>
    </div>
  );
}
