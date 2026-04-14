"use server";

import { getTokenFn } from "@/utlities/getTokenFn";

export async function addToCart(productId: string) {
  console.log(productId);
  const token = await getTokenFn();
  console.log(token);
  
  
  if (!token) {
    throw new Error("User is not authenticated");
  }

  const data = await fetch(`${process.env.NEXT_PUBLIC_API}cart`, {
    method: "POST",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
  });
  const payload = await data.json();
  return payload;
}
