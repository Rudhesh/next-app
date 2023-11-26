import Graph from "../components/Graph";
import Layout from "../components/layout";
import MOCK_DATA from "../../../MOCK_DATA.json";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table-panel";
import EditPanel from "./editPanel";
interface DataPoint {
  id: number;
  value: number;
  time_stamp: string;
  min: number;
  max: string;
  status: string;
  // Add other properties from your JSON data if needed
}
async function getUsers(): Promise<any> {
  const res = await fetch("http://localhost:3000/api/dataPoint");
  const data = await res.json();
  console.log(data);
  return data.data;
}

export default async function Panel() {
  const data = await getUsers();
  console.log({ data });
  return (
    <Layout>
      {/* <h1>Panel</h1>
      <Graph data={MOCK_DATA} />
      <DataTable columns={columns} data={MOCK_DATA} /> */}
      <EditPanel data={data} />
      {/* <EditPanel data={MOCK_DATA} /> */}
    </Layout>
  );
}
