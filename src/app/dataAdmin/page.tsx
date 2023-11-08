
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions} from "../api/auth/[...nextauth]/route";
import Layout from "../components/layout";

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
    <Layout> 
   <div className="flex items-center justify-center">
      <div className="bg-sky-700 text-slate-100 p-2 rounded shadow grid grid-cols-2 mt-9">
        <p>Name:</p>
        <p>{session?.user.realname}</p>
        <p>Email:</p>
        <p>{session?.user.email}</p>
        <p>Role:</p>
        <p>{session?.user.role}</p>
      </div>
   
</div></Layout>
   
  )
}