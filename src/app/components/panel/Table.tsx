// components/Table.tsx

import React from "react";

interface TableProps {
  channels: string[];
}

const Table: React.FC<TableProps> = ({ channels }) => {
  return (
    <div className="bg-gray-800 text-white p-4">
      <h3 className="text-xl font-semibold mb-4">Table</h3>
      <table className="min-w-full bg-gray-900 border border-gray-700">
        <thead>
          <tr>
            <th className="border-b border-gray-700">Channel</th>
            {/* Add more header columns as needed */}
          </tr>
        </thead>
        <tbody>
          {channels.map((channel, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"}
            >
              <td className="border-b border-gray-700 p-2">{channel}</td>
              {/* Add more columns as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
