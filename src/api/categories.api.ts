interface CategoriesInterface {
  name: string;
  image: string;
  _id:string;
}
export async function getCategories(): Promise<CategoriesInterface[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}categories`);
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await res.json();
    return data?.data;
  } catch (error) {
    throw new Error("Failed to fetch products");
  }
}