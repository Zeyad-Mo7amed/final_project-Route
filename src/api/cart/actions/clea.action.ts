"use server";
import { getTokenFn } from "@/utlities/getTokenFn";
export async function clearCart() {
  const token = await getTokenFn();
  console.log(token);
  
  
  if (!token) {
    throw new Error("User is not authenticated");
  }

  const data = await fetch(`${process.env.NEXT_PUBLIC_API}cart`, {
    method: "DELETE",
    headers: {
      token,
      "Content-Type": "application/json",
    },
  });
  const payload = await data.json();
  return payload;
}
