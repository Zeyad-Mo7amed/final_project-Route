  interface SpecificCategoryInterface {
    name:string;
    image:string;
  }
export async function getSpecificCategory(
  id: string,
): Promise<SpecificCategoryInterface> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}categories/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = await res.json();
    return data?.data;
  } catch (error) {
    throw new Error("Failed to fetch categories");
  }
}