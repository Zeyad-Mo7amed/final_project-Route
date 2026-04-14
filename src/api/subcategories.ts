interface subcategories {
  name: string;
  _id: string;
}

export async function subcategories(): Promise<subcategories[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}subcategories`,
    );
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await res.json();
    console.log("subcategories", data);
    
    return data;
  } catch (error: unknown) {
    throw new Error((error as Error).message || "Failed to fetch products");
  }
}
