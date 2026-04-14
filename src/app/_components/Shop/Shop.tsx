import React from "react";
import ProductItem from "../ProductItem/Product.Item";
import { getAllProducts } from "@/api/product.api";
import Link from "next/link";

export default async function Shop() {
  const data = await getAllProducts();
  return (
    <>
      <div className="bg-gradient-to-br from-[#4ade80] via-[#22c55e] to-[#16a34a] text-white">
        <div className="container mx-auto px-4 py-10 sm:py-14">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap">
            <Link className="hover:text-white transition-colors" href="/">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white font-medium">All Products</span>
          </nav>
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
              <svg
                data-prefix="fas"
                data-icon="box-open"
                className="h-[1em] svg-inline--fa fa-box-open text-3xl"
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
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                All Products
              </h1>
              <p className="text-white/80 mt-1">
                Explore our complete product collection
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className=" px-5 md:px-7 lg:px-10 py-10  grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 gap-6">
        {data.map((product) => {
          return <ProductItem product={product} key={product._id} />;
        })}
      </div>
    </>
  );
}
