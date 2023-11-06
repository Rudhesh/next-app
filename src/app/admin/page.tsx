import { getServerSession } from "next-auth";
import React from "react";
import { authOptions} from "../api/auth/[...nextauth]/route";

type Props = {}

export default async function page({}: Props) {
    const session = await getServerSession(authOptions);
  return (
    <div>page 
        <p>  {JSON.stringify(session)}</p>
    </div>
  )
}