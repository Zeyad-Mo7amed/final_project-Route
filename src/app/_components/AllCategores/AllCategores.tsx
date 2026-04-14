import { getCategories } from "@/api/categories.api";
import { getAllProducts } from "@/api/product.api";
import Image from "next/image";
import Link from "next/link";
import ProductItem from "../ProductItem/Product.Item";
import { Suspense } from "react";
function DataLoading() {
  return (
    <div className="flex items-center justify-center h-[400px] w-full">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
        <p className="text-green-700 font-medium animate-pulse">
          Loading data...
        </p>
      </div>
    </div>
  );
}

async function ContentFetcher({
  id,
  decodedId,
}: {
  id: string;
  decodedId: string;
}) {
  let data: any[];
  if (id === "allCategories") {
    data = await getCategories();
  } else {
    data = await getAllProducts();
  }

  return (
    <>
      {id === "allCategories" ? (
        <>
          <div className="fixed inset-0 bg-black/50 z-50 lg:hidden transition-opacity duration-300 opacity-0 pointer-events-none">
            <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transition-transform duration-300 overflow-y-auto translate-x-full">
              <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
                <Image
                  alt="FreshCart"
                  loading="lazy"
                  width={160}
                  height={31}
                  decoding="async"
                  className="h-8 w-auto"
                  src="/_next/static/media/freshcart-logo.49f1b44d.svg"
                />
                <button
                  title="xmark"
                  className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <svg
                    data-prefix="fas"
                    data-icon="xmark"
                    className="svg-inline--fa fa-xmark text-gray-600"
                    role="img"
                    viewBox="0 0 384 512"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="min-h-screen bg-green-50/50">
            <div className="container mx-auto px-4 py-10">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                {data.map((categorie: any) => (
                  <Link
                    key={categorie?._id}
                    className="group bg-white hover:text-green-700 rounded-2xl border border-gray-100 p-4 sm:p-6 shadow-sm hover:shadow-xl hover:border-primary-200 transition-all duration-300 hover:-translate-y-1"
                    href={`/subcategories/${categorie._id}`}
                  >
                    <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 mb-4">
                      <Image
                        width={100}
                        height={100}
                        alt={categorie?.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        src={categorie?.image}
                      />
                    </div>
                    <h3 className="font-bold text-gray-900 text-center group-hover:text-primary-600 transition-colors">
                      {categorie.name}
                    </h3>
                    <div className="flex justify-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs text-primary-600 hover:text-green-500 flex items-center gap-1">
                        {" "}
                        View Subcategories{" "}
                        <svg
                          data-prefix="fas"
                          data-icon="arrow-right"
                          className="h-[1em] svg-inline--fa fa-arrow-right text-[10px]"
                          role="img"
                          viewBox="0 0 512 512"
                          aria-hidden="true"
                        >
                          <path
                            fill="currentColor"
                            d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-105.4 105.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                          />
                        </svg>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="container mx-auto px-4 py-10">
          {/* بنعمل فلترة للداتا الأول عشان نعرف هل فيه منتجات مطابقة ولا لا */}
          {(() => {
            const filteredProducts = data.filter(
              (product: any) => product.category.name === decodedId,
            );

            if (filteredProducts.length === 0) {
              return (
                <div className="container mx-auto px-4 py-8">
                  <div className="mb-6 flex items-center gap-3 flex-wrap">
                    <span className="flex items-center gap-2 text-sm text-gray-600">
                      <svg
                        data-prefix="fas"
                        data-icon="filter"
                        className="h-[1em] svg-inline--fa fa-filter"
                        role="img"
                        viewBox="0 0 512 512"
                        aria-hidden="true"
                      >
                        <path
                          fill="currentColor"
                          d="M32 64C19.1 64 7.4 71.8 2.4 83.8S.2 109.5 9.4 118.6L192 301.3 192 416c0 8.5 3.4 16.6 9.4 22.6l64 64c9.2 9.2 22.9 11.9 34.9 6.9S320 492.9 320 480l0-178.7 182.6-182.6c9.2-9.2 11.9-22.9 6.9-34.9S492.9 64 480 64L32 64z"
                        />
                      </svg>
                      Active Filters:
                    </span>
                    <Link
                      className="text-sm text-gray-500 hover:text-gray-700 underline"
                      href="/products"
                    >
                      Clear all
                    </Link>
                  </div>
                  <div className="mb-6 text-sm text-gray-500">
                    Showing 0 products
                  </div>
                  <div className="text-center py-20">
                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
                      <svg
                        data-prefix="fas"
                        data-icon="box-open"
                        className="h-[1em] svg-inline--fa fa-box-open text-3xl text-gray-400"
                        role="img"
                        viewBox="0 0 640 512"
                        aria-hidden="true"
                      >
                        <path
                          fill="currentColor"
                          d="M560.3 237.2c10.4 11.8 28.3 14.4 41.8 5.5 14.7-9.8 18.7-29.7 8.9-44.4l-48-72c-2.8-4.2-6.6-7.7-11.1-10.2L351.4 4.7c-19.3-10.7-42.8-10.7-62.2 0L88.8 116c-5.4 3-9.7 7.4-12.6 12.8L27.7 218.7c-12.6 23.4-3.8 52.5 19.6 65.1l33 17.7 0 53.3c0 23 12.4 44.3 32.4 55.7l176 99.7c19.6 11.1 43.5 11.1 63.1 0l176-99.7c20.1-11.4 32.4-32.6 32.4-55.7l0-117.5zm-240-9.8L170.2 144 320.3 60.6 470.4 144 320.3 227.4zm-41.5 50.2l-21.3 46.2-165.8-88.8 25.4-47.2 161.7 89.8z"
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
                      href="/"
                    >
                      View All Products
                    </Link>
                  </div>
                </div>
              );
            }

            return (
              <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 gap-6">
                {filteredProducts.map((product: any) => (
                  <ProductItem key={product._id} product={product} />
                ))}
              </div>
            );
          })()}
        </div>
      )}
    </>
  );
}

export default async function AllCategores({ id }: { id: string }) {
  const decodedId = decodeURIComponent(id);

  return (
    <>
      <div className="bg-gradient-to-br from-[#4ade80] via-[#22c55e] to-[#16a34a] text-white">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
            <Link className="hover:text-white transition-colors" href="/">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white font-medium">Categories</span>
          </nav>
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
              <svg
                className="h-[1em] text-3xl"
                viewBox="0 0 512 512"
                fill="currentColor"
              >
                <path d="M232.5 5.2c14.9-6.9 32.1-6.9 47 0l218.6 101c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L13.9 149.8C5.4 145.8 0 137.3 0 128s5.4-17.9 13.9-21.8L232.5 5.2zM48.1 218.4l164.3 75.9c27.7 12.8 59.6 12.8 87.3 0l164.3-75.9 34.1 15.8c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L13.9 277.8C5.4 273.8 0 265.3 0 256s5.4-17.9 13.9-21.8l34.1-15.8zM13.9 362.2l34.1-15.8 164.3 75.9c27.7 12.8 59.6 12.8 87.3 0l164.3-75.9 34.1 15.8c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L13.9 405.8C5.4 401.8 0 393.3 0 384s5.4-17.9 13.9-21.8z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                {decodedId}
              </h1>
              <p className="text-white/80 mt-1">
                Browse our wide range of product categories
              </p>
            </div>
          </div>
        </div>
      </div>

      <Suspense key={id} fallback={<DataLoading />}>
        <ContentFetcher id={id} decodedId={decodedId} />
      </Suspense>
    </>
  );
}
