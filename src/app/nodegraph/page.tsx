import { getServerSession } from "next-auth";
import Layout from "../components/layout";
import TestForm from "../components/testForm";

export default async function NodeGraph() {
  return (
    <Layout>
      <TestForm />
    </Layout>
  );
}
