'use server';

import { cookies } from "next/headers";
import { LoginType } from "../schema/schema.login";


export async function LoginSend(data: LoginType) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/auth/signin`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok)
    throw new Error(response?.statusText || "Failed to register user");

  const payload = await response.json();
  const cookie = await cookies();
  cookie.set("token", payload?.token,{
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Expires in 7 days
  } )

  return response.ok;
}