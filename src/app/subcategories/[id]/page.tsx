import { getSpecificCategory } from "@/api/specificCategory";
import Subcategories from "@/app/_components/Subcategories/Subcategories";

export default async function Page({ params }: { params: { id:string } }) {
  const id = (await params).id;
  const dataCategory = await getSpecificCategory(id) 
  return (
    <>
      <Subcategories dataCategory={dataCategory} />;
    </>
  );
}
