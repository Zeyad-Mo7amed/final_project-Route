interface BrandsInterface {
  name: string;
  image: string;
  _id: string;
}

export async function getBrands(): Promise<BrandsInterface[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}brands`);
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await res.json();
    return data?.data;
  } catch (error) {
    throw new Error("Failed to fetch products");
  }
}
