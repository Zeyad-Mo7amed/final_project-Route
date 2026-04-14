import { GetSpecificSubCategory } from "@/api/GetspecificSubCategory";
import { getAllProducts } from "@/api/product.api";
import Link from "next/link";
import ProductItem from "../ProductItem/Product.Item";
import { CategoryData, productInterface } from "@/interfaces/product.interface";

interface SubCategory {
  name: string;
}

export default async function Products({ subcategory }: { subcategory?: string }) {
  const data: CategoryData[] = await GetSpecificSubCategory(
    subcategory as unknown as string,
  );

  const currentCategory = data?.[0];

  console.log("dddd", data);
  console.log("subcategory", subcategory);

  const allData = await getAllProducts();

  const filteredProducts = allData.filter((product: productInterface) => {
    const productSubName = product.subcategory?.[0]?.name;
    return productSubName === currentCategory?.name;
  });

  return (
    <>
      <div className="min-h-screen bg-gray-50/50">
        <div className="bg-gradient-to-br from-[#4ade80] via-[#16a34a] to-[#22c55e] text-white">
          <div className="container mx-auto px-4 py-10 sm:py-14">
            <nav className="flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap">
              <Link className="hover:text-white transition-colors" href="/">
                Home
              </Link>
              <span className="text-white/40">/</span>
              <Link
                className="hover:text-white transition-colors"
                href="/categories"
              >
                Categories
              </Link>
              <span className="text-white/40">/</span>
              <span className="text-white font-medium">
                {currentCategory?.name}
              </span>
            </nav>

            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
                <svg className="h-[1em] text-3xl" viewBox="0 0 576 512">
                  <path
                    fill="currentColor"
                    d="M56 225.6L32.4 296.2 32.4 96c0-35.3 28.7-64 64-64l138.7 0c13.8 0 27.3 4.5 38.4 12.8l38.4 28.8c5.5 4.2 12.3 6.4 19.2 6.4l117.3 0c35.3 0 64 28.7 64 64l0 16-365.4 0c-41.3 0-78 26.4-91.1 65.6zM477.8 448L99 448c-32.8 0-55.9-32.1-45.5-63.2l48-144C108 221.2 126.4 208 147 208l378.8 0c32.8 0 55.9 32.1 45.5 63.2l-48 144c-6.5 19.6-24.9 32.8-45.5 32.8z"
                  />
                </svg>
              </div>

              <div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  {currentCategory?.name}
                </h1>
                <p className="text-white/80 mt-1">
                  Browse {currentCategory?.name} products
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="mb-6 flex items-center gap-3 flex-wrap">
            <span className="flex items-center gap-2 text-sm text-gray-600">
              Active Filters:
            </span>

            <Link
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#A4F4CF] text-green-700 text-sm font-medium hover:bg-emerald-200 transition-colors"
              href="/products"
            >
              {currentCategory?.name}
            </Link>

            <Link
              className="text-sm text-gray-500 hover:text-gray-700 underline"
              href="/products"
            >
              Clear all
            </Link>
          </div>

          <div className="mb-6 text-sm text-gray-500">
            Showing {filteredProducts.length} products
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product: productInterface) => (
                <ProductItem key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
                <svg
                  className="h-[1em] text-3xl text-gray-400"
                  viewBox="0 0 640 512"
                >
                  <path
                    fill="currentColor"
                    d="M560.3 237.2c10.4 11.8 28.3 14.4 41.8 5.5 14.7-9.8 18.7-29.7 8.9-44.4l-48-72c-2.8-4.2-6.6-7.7-11.1-10.2L351.4 4.7c-19.3-10.7-42.8-10.7-62.2 0L88.8 116c-5.4 3-9.7 7.4-12.6 12.8L27.7 218.7c-12.6 23.4-3.8 52.5 19.6 65.1l33 17.7 0 53.3c0 23 12.4 44.3 32.4 55.7l176 99.7c19.6 11.1 43.5 11.1 63.1 0l176-99.7c20.1-11.4 32.4-32.6 32.4-55.7l0-117.5z"
                  />
                </svg>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2">
                No Products Found
              </h3>

              <p className="text-gray-500 mb-6">
                No products match your current filters.
              </p>

              <Link
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
                href="/products"
              >
                View All Products
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
