"use client"; // ✅ Ensures this component runs only on the client side

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2"; // ✅ Directly import without dynamic()
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function DataVisualization() {
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [] as {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
      fill: boolean;
      tension: number;
    }[]
  });

  useEffect(() => {
    // Simulated health trend data (to be replaced with API data)
    const data = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Blood Pressure (mmHg)",
          data: [120, 125, 130, 128, 126, 124],
          borderColor: "#4F46E5", // AiCare Theme Color
          backgroundColor: "rgba(79, 70, 229, 0.2)", // AiCare Theme Shade
          pointBorderColor: "#4F46E5",
          fill: true,
          tension: 0.4
        },
        {
          label: "Heart Rate (bpm)",
          data: [72, 75, 78, 76, 74, 72],
          borderColor: "#DC2626", // AiCare Red Highlight
          backgroundColor: "rgba(220, 38, 38, 0.2)",
          pointBorderColor: "#DC2626",
          fill: true,
          tension: 0.4
        }
      ]
    };

    setChartData(data);
  }, []);

  return (
    <section className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Health Trends</h2>
      <div className="w-full h-64">
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: "top"
              }
            },
            scales: {
              x: {
                grid: {
                  color: "rgba(0, 0, 0, 0.1)"
                }
              },
              y: {
                grid: {
                  color: "rgba(0, 0, 0, 0.1)"
                },
                ticks: {
                  stepSize: 5
                }
              }
            }
          }}
        />
      </div>
    </section>
  );
}
