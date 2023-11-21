import Graph from "../components/Graph";
import Layout from "../components/layout";
import MOCK_DATA from "../../../MOCK_DATA.json";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table-panel";
import EditPanel from "./editPanel";

export default function Panel() {
  return (
    <Layout>
      {/* <h1>Panel</h1>
      <Graph data={MOCK_DATA} />
      <DataTable columns={columns} data={MOCK_DATA} /> */}
      <EditPanel data={MOCK_DATA} />
    </Layout>
  );
}
