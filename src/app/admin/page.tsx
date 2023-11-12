import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Layout from "../components/layout";
import Login from "../login/page";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import RegistrationForm from "../components/registrationForm";

interface createData {
  _id: string;
  realname: string;
  role: string;
  email: string;
}

async function fetchUsers() {
  const res = await fetch("http://localhost:3000/api/register", {
    next: {
      revalidate: 10,
    },
  });
  const data = await res.json();
  return data.users;
}

export default async function Admin() {
  const users = await fetchUsers();
  console.log(users);
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "admin") {
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
    );
  }
  return (
    <Layout>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Role</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">
                  <RegistrationForm />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user: createData) => (
                <TableRow
                  key={user._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {user.realname}
                  </TableCell>
                  <TableCell align="right">{user.role}</TableCell>
                  <TableCell align="right">{user.email}</TableCell>

                  <TableCell align="right">
                    <Button variant="contained" size="small">
                      update
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Layout>
  );
}
