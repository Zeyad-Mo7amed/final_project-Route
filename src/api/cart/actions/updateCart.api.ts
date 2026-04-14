"use server";
import { getTokenFn } from "@/utlities/getTokenFn";

export async function updateCart({
  productId,
  count,
}: {
  productId: string;
  count: number;
}) {
  console.log("Product ID:", productId);
  console.log("New Count:", count);

  const token = await getTokenFn();

  if (!token) {
    throw new Error("User is not authenticated");
  }

  const data = await fetch(`${process.env.NEXT_PUBLIC_API}cart/${productId}`, {
    method: "PUT",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ count: count.toString() }), 
  });

  const payload = await data.json();
  return payload;
}
