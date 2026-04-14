import Products from "../_components/Products/Products";

export default async function ProductsPage({searchParams,}: {
  searchParams: { subcategory?: string };
}) {
  const subcategory = (await searchParams).subcategory;
  
  return (
    <div>
      <Products subcategory={subcategory} />
    </div>
  );
}
