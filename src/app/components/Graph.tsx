"use client";
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface DataPoint {
  id: number;
  value: number;
  time_stamp: string;
  // Add other properties from your JSON data if needed
}

interface GraphProps {
  data: DataPoint[];
}

const Graph: React.FC<GraphProps> = ({ data }) => {
  const graphRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    console.log(data);
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = window.innerWidth - margin.left - margin.right;
    const height = window.innerHeight - margin.top - margin.bottom;

    const xScale = d3
      .scaleTime()
      .domain([
        d3.min(data, (d) => new Date(d.time_stamp))!,
        d3.max(data, (d) => new Date(d.time_stamp))!,
      ])
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)!])
      .range([height, 0]);

    const svg = d3.select(graphRef.current);

    svg.selectAll("*").remove(); // Clear previous elements

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const bars = g
      .selectAll<SVGRectElement, DataPoint>("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(new Date(d.time_stamp)))
      .attr("y", (d) => yScale(d.value))
      .attr("width", 20)
      .attr("height", (d) => height - yScale(d.value))
      .attr("fill", "blue");

    // Add text elements for timestamp and value
    g.selectAll<SVGTextElement, DataPoint>("text")
      .data(data)
      .enter()
      .append("text")
      .attr("x", (d) => xScale(new Date(d.time_stamp)) + 10)
      .attr("y", (d) => yScale(d.value) - 5)
      .text((d) => `Value: ${d.value}, Time: ${d.time_stamp}`)
      .attr("font-size", "12px ")
      .style("fill", "gray"); // Set the font color to gray

    const xAxis = d3.axisBottom(xScale);
    g.append("g").attr("transform", `translate(0,${height})`).call(xAxis);

    const yAxis = d3.axisLeft(yScale);
    g.append("g").call(yAxis);
  }, [data]);

  return (
    <svg
      ref={graphRef}
      viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`}
      preserveAspectRatio="xMidYMid meet"
      className="dark:text-white"
    />
  );
};

export default Graph;
