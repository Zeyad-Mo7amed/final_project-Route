interface subcategories {
  name: string;
  _id: string;
}

export async function GetSpecificSubCategory(id:string): Promise<subcategories[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}subcategories/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await res.json();
    console.log('log Data' , data);
    
    return data;
  } catch (error) {
    throw new Error("Failed to fetch products");
  }
}
