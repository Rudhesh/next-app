import DataPoint from "@/models/DataPoint";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { disconnect } from "mongoose";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  const { value, time_stamp, station_id } = await request.json();

  await connect();

  const existingUser = await DataPoint.findOne({ station_id });

  if (existingUser) {
    return new NextResponse("Email is already in use", { status: 400 });
  }

  const newUser = new DataPoint({
    value, time_stamp, station_id 
  });

  try {
    await newUser.save();
    return new NextResponse("user is registered", { status: 200 });
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};

export const GET = async (req: Request, res: NextResponse) => {
  try {
    await connect();
    const data = await DataPoint.find();
    console.log({data})
    return NextResponse.json({ message: "Success", data }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await disconnect();
  }
};
