import { productInterface } from "@/interfaces/product.interface";
import error from './../app/error';

export async function getAllProducts(): Promise<productInterface[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}products`);
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP ${res.status}: ${text}`);
    }
    const data = await res.json();    
    return data?.data;
  } catch (error) {
    console.error("🔥 REAL ERROR:", error);
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred",
    );
  }
}
