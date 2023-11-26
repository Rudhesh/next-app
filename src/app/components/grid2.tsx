"use client";
import React, { useState } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import Graph from "./panel/Graph";
import Sidebar from "./panel/Sidebar";

const Grid2: React.FC = () => {
  const layout = [
    { i: "graph", x: 0, y: 0, w: 4, h: 4 },
    { i: "table", x: 4, y: 0, w: 4, h: 4 },
    { i: "sidebar", x: 8, y: 0, w: 4, h: 4 },
  ];

  const onLayoutChange = (newLayout: any) => {
    // Handle layout changes if needed
  };

  return (
    <GridLayout
      className="layout"
      layout={layout}
      cols={12}
      rowHeight={100}
      width={1500}
      draggableHandle=".drag-handle"
      onLayoutChange={onLayoutChange}
    >
      <div
        key="graph"
        className="bg-slate-50 dark:bg-zinc-900 border-2 border-slate-200 rounded p-4 m-2"
      >
        <p>
          Graph Component
          <span className="drag-handle">⇄</span>
        </p>
      </div>

      <div
        key="table"
        className="bg-slate-50 dark:bg-zinc-900 border-2 border-slate-200 rounded p-4 m-2"
      >
        <Graph channels={[]} selectedTime={""} />
        <p>
          Table Component
          <span className="drag-handle">⇄</span>
        </p>
      </div>

      <div
        key="sidebar"
        className="bg-slate-50 dark:bg-zinc-900 border-2 border-slate-200 rounded p-4 m-2"
      >
        <Sidebar />
        <p>
          Sidebar Component
          <span className="drag-handle">⇄</span>
        </p>
      </div>
    </GridLayout>
  );
};

export default Grid2;
