
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions} from "../api/auth/[...nextauth]/route";
import Layout from "../components/layout";
import Login from "../login/page";

type Props = {}

export default async function DataAdmin({}: Props) {
  const session = await getServerSession(authOptions);
    if (session?.user.role !== "data-admin") {
      return (
        <Layout>
        <section className="py-24">
          <div className="container">
            <h1 className="text-2x1 font-bold">
              You are not authorized to view this page
            </h1>
          </div>
        </section>
        </Layout>
      )
    }
  return (
    <Layout> <div>page 
    <p>  {JSON.stringify(session)}</p>
</div></Layout>
   
  )
}