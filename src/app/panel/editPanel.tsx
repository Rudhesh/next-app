"use client";
import React, { useState } from "react";
import Sidebar from "../components/panel/Sidebar";
import Table from "../components/panel/Table";
import { columns } from "./columns";
import MOCK_DATA from "../../../MOCK_DATA.json";
import Graph from "../components/panel/Graph";
import { SearchBar } from "../components/panel/searchBar";
import FavDashboard from "../components/favDashboard";
import { Button } from "@/components/ui/button";
import AbsoluteTimeRange from "../components/panel/timePeriod";

interface EditPanelProps {
  // Add any necessary props
}

const EditPanel: React.FC<EditPanelProps> = () => {
  const [channels, setChannels] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>("");

  const handleAddChannel = (channel: string) => {
    setChannels([...channels, channel]);
  };

  const handleSavePanel = () => {
    // Implement saving the panel data to the database
  };

  return (
    <div className="dark:text-white min-h-screen p-8 flex">
      <div className="flex flex-col flex-grow mr-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Edit Panel</h2>
          <div className="flex mb-4">
            {" "}
            <div className="mr-4">
              <SearchBar />{" "}
            </div>{" "}
            <AbsoluteTimeRange />
          </div>
        </div>
        <div className="flex mb-4">
          <div className="mr-4">
            {/* Search bar component */}

            {/* Add channels to the state when selected */}
          </div>
          <div>
            {/* Time selection component */}
            {/* Update selectedTime state when the time is selected */}
          </div>
        </div>
        <Graph channels={channels} selectedTime={selectedTime} />
        {/* Graph component with channels and selected time as props */}
        <Table channels={channels} />
        {/* Table component with channels as props */}
      </div>
      <div>
        {" "}
        <Button variant="outline" className=" px-4 py-2 rounded">
          Share
        </Button>
        <Button variant="outline" className=" px-4 py-2 rounded">
          Delete
        </Button>
        <Button
          onClick={handleSavePanel}
          variant="outline"
          className=" px-4 py-2 rounded"
        >
          Save
        </Button>
        <Sidebar />
      </div>

      {/* Sidebar component with tools to manipulate the graph */}
    </div>
  );
};

export default EditPanel;
