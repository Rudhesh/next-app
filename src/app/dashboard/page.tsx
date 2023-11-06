import Layout from "../components/layout"
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Providers from "../providers";
import ThemeButton from "../components/ThemeButton";
import {useTheme} from "next-themes"

import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

      
    return (
    
        <Layout>
        <div><h1>Dashboard</h1><p> {JSON.stringify(session)}</p></div>
      </Layout>

     
    )
}