import { productInterface } from "@/interfaces/product.interface";

export async function getProductsDetails(id:string): Promise<productInterface> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}products/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await res.json();
  return data?.data;
  }catch (error) {
    throw new Error(error instanceof Error ? error.message : "An unknown error occurred");
  }

}