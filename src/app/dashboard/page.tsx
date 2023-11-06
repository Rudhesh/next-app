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
          <section className="py-24">
            <div className="container">
              <h1 className="text-2x1 font-bold">
              {JSON.stringify(session)}
              </h1>
            </div>
          </section>

      </Layout>

     
    )
}