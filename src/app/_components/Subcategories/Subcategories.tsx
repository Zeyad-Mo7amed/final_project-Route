import { subcategories } from "@/api/subcategories";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Subcategories({dataCategory}: {dataCategory: {name: string, image: string}}) {
  const data: { _id: string; name: string }[] = await subcategories();
  console.log('dataCategory', dataCategory);
  console.log('data',data);
  
  
  return (
    <>
      <div className="min-h-screen bg-gray-50/50">
        <div className="bg-gradient-to-br from-[#4ade80] via-[#16a34a] to-[#22c55e] text-white">
          <div className="container mx-auto px-4 py-12 sm:py-16">
            <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
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
              <span className="text-white font-medium">{dataCategory.name}</span>
            </nav>
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30 overflow-hidden">
                <Image
                  width={100}
                  height={100}
                  alt="Men's Fashion"
                  className="w-12 h-12 object-contain"
                  src={dataCategory.image}
                />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  {dataCategory.name}
                </h1>
                <p className="text-white/80 mt-1">
                  Choose a subcategory to browse products
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-10">
          <Link
            className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors mb-6"
            href="/"
          >
            <svg
              data-prefix="fas"
              data-icon="arrow-left"
              className="h-[1em] svg-inline--fa fa-arrow-left"
              role="img"
              viewBox="0 0 512 512"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 105.4-105.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
              />
            </svg>
            <span>Back to Categories</span>
          </Link>
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900">
              {`${data.length} Subcategories in Men's Fashion`}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {data.map((subCate:{ _id: string; name: string }) => {
              return (
                <Link
                  key={subCate._id}
                  className="group bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:border-green-200 transition-all duration-300 hover:-translate-y-1"
                  href={`/products?subcategory=${subCate._id}`}
                >
                  <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors">
                    <svg
                      data-prefix="fas"
                      data-icon="folder-open"
                      className="h-[1em] svg-inline--fa fa-folder-open text-2xl text-green-600"
                      role="img"
                      viewBox="0 0 576 512"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M56 225.6L32.4 296.2 32.4 96c0-35.3 28.7-64 64-64l138.7 0c13.8 0 27.3 4.5 38.4 12.8l38.4 28.8c5.5 4.2 12.3 6.4 19.2 6.4l117.3 0c35.3 0 64 28.7 64 64l0 16-365.4 0c-41.3 0-78 26.4-91.1 65.6zM477.8 448L99 448c-32.8 0-55.9-32.1-45.5-63.2l48-144C108 221.2 126.4 208 147 208l378.8 0c32.8 0 55.9 32.1 45.5 63.2l-48 144c-6.5 19.6-24.9 32.8-45.5 32.8z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg group-hover:text-green-600 transition-colors mb-2">
                    {subCate.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-green-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Browse Products</span>
                    <svg
                      data-prefix="fas"
                      data-icon="arrow-right"
                      className="h-[1em] svg-inline--fa fa-arrow-right text-xs"
                      role="img"
                      viewBox="0 0 512 512"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-105.4 105.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                      />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
