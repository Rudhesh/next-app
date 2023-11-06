import { getServerSession } from "next-auth";
import Layout from "../components/layout"

export default async function NodeGraph() {
    const session = await getServerSession();

    return (
        <Layout>
             
            <h1>Node-Graph</h1>
      </Layout>
    )
}