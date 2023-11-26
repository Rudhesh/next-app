import { getServerSession } from "next-auth";
import Layout from "../components/layout";
import Grid2 from "../components/grid2";

export default async function DataPartion() {
  const session = await getServerSession();
  console.log(session);
  return (
    <Layout>
      <Grid2 />
    </Layout>
  );
}
