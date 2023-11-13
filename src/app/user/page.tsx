import Link from "next/link";
import Layout from "../components/layout";
import { User, columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { Button } from "@mui/material";

async function getUsers(): Promise<User[]> {
  const res = await fetch("http://localhost:3000/api/register");
  const data = await res.json();
  return data.users;
}

export default async function User() {
  const data = await getUsers();
  console.log(data);
  return (
    <Layout>
      <div className="bg-[#Ecf9ff] p-10 rounded">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2x1 font-bold">Users</h1>
          <Link href="/register">
            <Button>Register</Button>
          </Link>
        </div>
        <DataTable columns={columns} data={data} />
      </div>
    </Layout>
  );
}
