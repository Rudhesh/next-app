import { getServerSession } from "next-auth";
import Layout from "../components/layout"

export default async function DataPartion() {
    const session = await getServerSession();
console.log(session)
    return (
        <Layout>
            { session &&
            <h1>Data-Partion</h1>}
      </Layout>
    )
}