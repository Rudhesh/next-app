"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/panel/Sidebar";
import Table from "../components/panel/Table";
import { columns } from "./columns";
import MOCK_DATA from "../../../MOCK_DATA.json";
// import Graph from "../components/panel/Graph";
import FavDashboard from "../components/favDashboard";
import { Button } from "@/components/ui/button";
import SearchBar from "../components/panel/searchBar";
import AbsoluteTimeRange from "../components/panel/absoluteTimeRange";
import Graph from "../components/panel/graphX";
import { DataTable } from "@/components/data-table-panel";

interface EditPanelProps {
  // Add any necessary props
}

interface DataPoint {
  id: number;
  value: number;
  time_stamp: string;
  min: number;
  max: string;
  status: string;
  // Add other properties from your JSON data if needed
}

interface GraphProps {
  data: DataPoint[];
}

const EditPanel: React.FC<GraphProps> = ({ data }) => {
  const [channels, setChannels] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [originalData, setOriginalData] = useState<DataPoint[]>([]); // Original data from the server
  const [filteredData, setFilteredData] = useState<DataPoint[]>([]); // Filtered data based on search and time range
  useEffect(() => {
    // Fetch data from your server and set it to both originalData and filteredData
    // Example: axios.get('/api/data').then((response) => setOriginalData(response.data));
    setOriginalData(data);
  }, []);
  console.log(filteredData);
  const handleAddChannel = (channel: string) => {
    setChannels([...channels, channel]);
  };

  const handleSavePanel = () => {
    // Implement saving the panel data to the database
  };

  const handleSearch = (query: string) => {
    const filtered = originalData.filter(
      (item) =>
        // Implement your search logic here
        item.id.toString().includes(query) ||
        item.value.toString().includes(query) ||
        item.time_stamp.includes(query)
    );
    setFilteredData(filtered);
  };

  const handleTimeRange = (startTime: string, endTime: string) => {
    const filtered = originalData.filter(
      (item) =>
        // Check if the time_stamp is within the specified range
        new Date(item.time_stamp) >= new Date(startTime) &&
        new Date(item.time_stamp) <= new Date(endTime)
    );
    setFilteredData(filtered);
  };

  return (
    <div className="dark:text-white flex">
      <div className="flex flex-col flex-grow">
        <div className="flex justify-between items-center bg-slate-50 dark:bg-zinc-900 border-2 border-slate-200	rounded dark:border-gray-800 p-4 m-2">
          <h2 className="text-2xl font-semibold">Edit Panel</h2>
          <div className="flex">
            {" "}
            <div className="mr-4">
              <SearchBar onSearch={handleSearch} />
            </div>{" "}
            <AbsoluteTimeRange onApply={handleTimeRange} />
          </div>
        </div>

        {/* <div className="border-2 border-slate-200 dark:border-gray-800 p-4 m-2">
          {" "}
          <Graph channels={channels} selectedTime={selectedTime} />
        </div> */}
        <div className="bg-slate-50 dark:bg-zinc-900 border-2 border-slate-200 dark:border-gray-800 rounded p-4 m-2">
          {" "}
          <Graph data={filteredData} />
        </div>
        {/* Graph component with channels and selected time as props */}
        <div className="bg-slate-50 dark:bg-zinc-900 border-2 border-slate-200 dark:border-gray-800 rounded p-4 m-2">
          {" "}
          {/* <Table data={filteredData} /> */}
          <DataTable columns={columns} data={filteredData} />
        </div>

        {/* Table component with channels as props */}
      </div>
      <div className="bg-slate-50 dark:bg-zinc-900 border-2 border-slate-200 dark:border-gray-800 rounded p-4 m-2 ">
        {" "}
        <Button variant="outline" className=" px-4 py-2 ">
          Share
        </Button>
        <Button variant="outline" className=" px-4 py-2 ">
          Delete
        </Button>
        <Button
          onClick={handleSavePanel}
          variant="outline"
          className=" px-4 py-2 "
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
