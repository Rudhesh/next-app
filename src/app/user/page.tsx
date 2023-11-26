import Link from "next/link";
import Layout from "../components/layout";
import { User, columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { Button } from "@mui/material";
import RegistrationForm from "../components/registrationForm";

async function getUsers(): Promise<User[]> {
  const res = await fetch("http://localhost:3000/api/register");
  const data = await res.json();
  return data.users;
}

export default async function User() {
  const data = await getUsers();
  console.log("data");
  return (
    <Layout>
      <div className=" p-10 rounded">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2x1 font-bold">User Management</h1>
        </div>
        <DataTable columns={columns} data={data} />
      </div>
    </Layout>
  );
}
