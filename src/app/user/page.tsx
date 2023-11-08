
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions} from "../api/auth/[...nextauth]/route";
import Layout from "../components/layout";

export default async function User() {
    const session = await getServerSession(authOptions);
    return (
        <Layout>
            <h1>User</h1>
            <div className="flex items-center justify-center">
      <div className="bg-sky-100 text-slate-700 p-2 rounded shadow grid grid-cols-2 mt-9">
        <p>Name:</p>
        <p>{session?.user.realname}</p>
        <p>Email:</p>
        <p>{session?.user.email}</p>
        <p>Role:</p>
        <p>{session?.user.role}</p>
      </div>
   
</div>
      </Layout>
    )
}