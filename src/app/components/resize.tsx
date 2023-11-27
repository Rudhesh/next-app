"use client";
import React, { useState, useRef, useEffect } from "react";
import Graph from "./panel/graphX";
import Table from "./panel/Table";
import Sidebar from "./panel/Sidebar";
import EditPanelGrid from "./grid";

const ResizableComponents = () => {
  const [leftWidth, setLeftWidth] = useState(200);
  const [rightWidth, setRightWidth] = useState(200);
  const [isDragging, setIsDragging] = useState(false);
  const dragHandleRef = useRef<HTMLDivElement>(null);
  const minWidthPercentage = 10; // Set your desired minimum percentage of the screen width

  const handleMouseDown = (event: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    dragHandleRef.current!.setPointerCapture(event.pointerId);
  };

  const handleMouseMove = (event: globalThis.PointerEvent) => {
    if (!isDragging) return;

    const screenWidth = window.innerWidth;

    // Calculate the minimum width based on the screen width and percentage
    const minWidth = (screenWidth * minWidthPercentage) / 100;

    // Ensure the right component has a minimum width
    const newRightWidth = Math.max(minWidth, screenWidth - event.clientX);

    setLeftWidth(event.clientX);
    setRightWidth(newRightWidth);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("pointermove", handleMouseMove);
      window.addEventListener("pointerup", handleMouseUp);
    } else {
      window.removeEventListener("pointermove", handleMouseMove);
      window.removeEventListener("pointerup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("pointermove", handleMouseMove);
      window.removeEventListener("pointerup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="flex h-full">
      <div
        className="flex-grow bg-gray-200"
        style={{ width: `${leftWidth}px`, height: "100%" }}
      >
        {/* Left component content */}
        <EditPanelGrid />
      </div>
      <div
        className="flex items-center justify-center bg-gray-300"
        ref={dragHandleRef}
        onPointerDown={handleMouseDown}
        style={{ cursor: "col-resize", width: "10px", height: "100%" }}
      >
        {/* Drag handle */}
      </div>
      <div
        className="flex-grow bg-gray-400"
        style={{
          minWidth: `${minWidthPercentage}vw`,
          width: `${rightWidth}px`,
          height: "100%",
        }}
      >
        {/* Right component content */}
        <Sidebar />
      </div>
    </div>
  );
};

export default ResizableComponents;
