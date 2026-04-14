"use server";
import { getTokenFn } from "@/utlities/getTokenFn";
export async function deleteItemWichtes(productId: string) {

  const token = await getTokenFn();
  
  
  if (!token) {
    throw new Error("User is not authenticated");
  }

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API}wishlist/${productId}`,
    {
      method: "DELETE",
      headers: {
        token,
        "Content-Type": "application/json",
      },
    },
  );
  const payload = await data.json();
  return payload;
}
