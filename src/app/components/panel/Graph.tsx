// components/Graph.tsx

import React from "react";
import Chart from "react-apexcharts";

interface GraphProps {
  channels: string[];
  selectedTime: string;
}

interface DataPoint {
  time_stamp: string;
  value: number;
}

const generateData = (): DataPoint[] => {
  const startDate = new Date("2023-11-20T12:00:00Z");
  const data: DataPoint[] = [];

  for (let i = 0; i < 50; i++) {
    const newDate = new Date(startDate.getTime() + i * 15 * 60 * 1000); // Adding 15 minutes for each entry
    const entry: DataPoint = {
      time_stamp: newDate.toISOString(),
      value: Math.floor(Math.random() * 100), // Random value for illustration
    };
    data.push(entry);
  }

  return data;
};

const Graph: React.FC<GraphProps> = ({ channels, selectedTime }) => {
  // Generate dummy data
  const data = generateData();

  // Parse the data
  const parsedData = data.map((d) => ({
    x: new Date(d.time_stamp).getTime(),
    y: d.value,
  }));

  const options = {
    chart: {
      type: "line",
      width: "100%", // Set the chart width to 100% of its container
    },
    xaxis: {
      type: "datetime",
    },
  } as ApexCharts.ApexOptions;
  return (
    <div>
      <Chart
        options={options}
        series={[{ data: parsedData }]}
        type="line"
        width="100%" // Set the chart width to 100% of its container
        height={400}
      />
    </div>
  );
};

export default Graph;
