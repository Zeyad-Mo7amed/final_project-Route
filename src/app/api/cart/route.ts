import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  const token = await getToken({req});
  if (!token) 
    return NextResponse.json({error:'User is not authenticated'},{status:401});
  const data = await fetch(`${process.env.NEXT_PUBLIC_API}cart`, {
    headers: {
      token: token.token,
      "Content-Type": "application/json",
    },
  });
  const payload = await data.json();
  if (!data.ok) {
    return NextResponse.json({error:payload.error},{status:data.status});
  }
  return NextResponse.json(payload);
}