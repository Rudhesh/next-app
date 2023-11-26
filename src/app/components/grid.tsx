"use client";
import React, { useEffect, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import Graph from "./panel/Graph";
import Sidebar from "./panel/Sidebar";
import BlueWave from "./blueWave";

const ResponsiveGridLayout = WidthProvider(Responsive);

const EditPanel: React.FC = () => {
  const [layouts, setLayouts] = useState<any>({ lg: getDefaultLayout() });

  function getDefaultLayout() {
    // Retrieve layout from localStorage or use a default layout if not present
    const storedLayout = localStorage.getItem("editPanelLayout");
    return storedLayout
      ? JSON.parse(storedLayout)
      : [
          { i: "graph", x: 0, y: 0, w: 6, h: 6 },
          { i: "table", x: 6, y: 0, w: 6, h: 6 },
          { i: "sidebar", x: 0, y: 6, w: 12, h: 6 },
          { i: "test", x: 0, y: 0, w: 6, h: 6 },
          { i: "text", x: 6, y: 0, w: 6, h: 6 },
          { i: "wave", x: 0, y: 6, w: 6, h: 6 },
        ];
  }

  function onLayoutChange(layout: any, layouts: any) {
    // Save layout to localStorage
    localStorage.setItem("editPanelLayout", JSON.stringify(layout));
    setLayouts({ ...layouts, lg: layout });
  }

  // Clear localStorage on component unmount
  useEffect(() => {
    return () => {
      localStorage.removeItem("editPanelLayout");
    };
  }, []);

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={layouts}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      onLayoutChange={onLayoutChange}
      isResizable={true}
      isDraggable={true}
    >
      <div
        key="graph"
        className="bg-slate-50 dark:bg-zinc-900 border-2 border-slate-200 rounded p-4 m-2"
      >
        <Graph channels={[]} selectedTime={""} />
      </div>

      <div
        key="table"
        className="bg-slate-50 dark:bg-zinc-900 border-2 border-slate-200 rounded p-4 m-2"
      >
        <Graph channels={[]} selectedTime={""} />
      </div>

      <div
        key="sidebar"
        className="bg-slate-50 dark:bg-zinc-900 border-2 border-slate-200 rounded p-4 m-2"
      >
        <Sidebar />
      </div>
      <div
        key="test"
        className="bg-slate-50 dark:bg-zinc-900 border-2 border-slate-200 rounded p-4 m-2"
      >
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque aperiam
          facere, aliquam ad harum tenetur amet debitis, accusamus possimus
          sapiente repellat, modi porro saepe praesentium nemo laboriosam fuga
          aut magni?
        </p>
      </div>

      <div
        key="text"
        className="bg-slate-50 dark:bg-zinc-900 border-2 border-slate-200 rounded p-4 m-2"
      >
        <h1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo ab
          expedita, ea voluptates pariatur nulla sit? Sapiente esse dignissimos
          ut aperiam ab veritatis mollitia quaerat non optio dolor, amet
          molestiae.
        </h1>
      </div>

      <div
        key="wave"
        className="bg-slate-50 dark:bg-zinc-900 border-2 border-slate-200 rounded p-4 m-2"
      >
        <BlueWave />
      </div>
    </ResponsiveGridLayout>
  );
};

export default EditPanel;
