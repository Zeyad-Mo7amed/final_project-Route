'use server';

import { RegisterType } from "../schema/schema.regester";


export async function registerAction(data: RegisterType) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/auth/signup`,
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
  return response.ok;
}