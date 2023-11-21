import React from "react";
import Chart from "react-apexcharts";

interface GraphProps {
  data: { time_stamp: string; value: number }[];
}

const Graph: React.FC<GraphProps> = ({ data }) => {
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
        series={[{ name: "Value", data: parsedData }]}
        type="line"
        width="100%"
        height={300}
      />
    </div>
  );
};

export default Graph;
