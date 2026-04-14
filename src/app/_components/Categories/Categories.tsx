
import { getCategories } from "@/api/categories.api";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Categories() {
  const categorieData = await getCategories();  
  return (
    <>
      <section id="categories" className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8">
            <div className="flex  items-center gap-3 my-8">
              <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                Shop By <span className="text-emerald-600">Category</span>
              </h2>
            </div>
            <Link
              className="text-green-600 self-end sm:self-auto hover:text-green-700 font-medium flex items-center cursor-pointer"
              href="categories"
            >
              View All Categories
              <svg
                data-prefix="fas"
                data-icon="arrow-right"
                className="h-[1em] svg-inline--fa fa-arrow-right ml-2"
                role="img"
                viewBox="0 0 512 512"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-105.4 105.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categorieData?.map((categorie) => {
              return (
                <React.Fragment key={categorie._id}>
                  <Link
                    key={categorie._id}
                    className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition group cursor-pointer"
                    href={`/subcategories/${categorie._id}`}
                  >
                    <div className="h-20 w-20 overflow-hidden bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary-200 transition">
                      <Image
                        alt={categorie.name}
                        loading="lazy"
                        width={300}
                        height={300}
                        decoding="async"
                        data-nimg={1}
                        className="w-full h-full object-cover"
                        src={categorie?.image}
                        style={{ color: "transparent" }}
                      />
                    </div>
                    <h3 className="font-medium">{categorie?.name}</h3>
                  </Link>
                </React.Fragment>
              );
            })}

          </div>
        </div>
      </section>
    </>
  );
}
