import { getAllProducts } from '@/api/product.api';
import React from 'react'
import ProductItem from '../ProductItem/Product.Item';
import TopProductItem from '../topProductItem/TopProductItem';
import Categories from '../Categories/Categories';

export default async function Product() {
  const data = await getAllProducts();
  return (
    <>
      <TopProductItem />
      <Categories/>
      <div className="container mx-auto my-10 xl:px-10">
        <div className="flex items-center gap-3 my-8">
          <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full" />
          <h2 className="text-3xl font-bold text-gray-800">
            Featured <span className="text-emerald-600">Products</span>
          </h2>
        </div>

        <div className="   grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 gap-6">
          {data.map((product) => {
            return <ProductItem product={product} key={product._id} />;
          })}
        </div>
      </div>
    </>
  );
}
