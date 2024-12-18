"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

export type chartType = {
  ave: number;
  labels: string[];
  data: number[];
  // title: string;///
};

const PointStyleChart = ({ chartData }: { chartData: chartType }) => {
  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Circle Points",
        data: chartData.data,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        pointStyle: "circle",
        pointRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: false,
        // text: chartData.title,
        color: "white",
      },
      legend: {
        display: false,
      },
      annotation: {
        annotations: {
          line: {
            type: "line",
            scaleID: "y", // y축 기준
            value: chartData.ave, // y값 20 위치에 선 그리기
            borderColor: "blue",
            borderWidth: 2,
            label: {
              display: true,
              color: "red",
              position: "end",
            },
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: false,
          text: "Quarters",
        },
      },
      y: {
        title: {
          display: false,
          text: "Values",
        },
        beginAtZero: false,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default PointStyleChart;
