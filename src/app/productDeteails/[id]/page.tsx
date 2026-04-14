import { getAllProducts } from "@/api/product.api";
import { getProductsDetails } from "@/api/productDeteails.api";
import ProductDeteails from "@/app/_components/productDeteails/productDeteails";

export default async function page({params,}: {params: Promise<{ id: string }>;}) {
  const id = (await params).id;
  const data = await getProductsDetails(id);
  const allData = await getAllProducts();
  return (
    <>
      <ProductDeteails data={data} allData={allData}/>
    </>
  );
}
