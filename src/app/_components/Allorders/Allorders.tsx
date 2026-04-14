"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

function OrderRow({ order }: { order: any }) {
  const [isOpent, setIsOpent] = useState(false);

  return (
    <div className="bg-white rounded-2xl border transition-all duration-300 overflow-hidden border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200">
      <div className="p-5 sm:p-6">
        <div className="flex gap-5">
          <div className="relative shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 p-2.5 overflow-hidden">
              <Image
                width={100}
                height={100}
                alt="Order Preview"
                className="w-full h-full object-contain"
                src={order.cartItems[0]?.product?.imageCover}
              />
            </div>
            {order.cartItems.length > 1 && (
              <div className="absolute -top-2 -right-2 w-7 h-7 bg-gray-900 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
                +{order.cartItems.length - 1}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-100 rounded-lg mb-2">
                  <svg
                    className="h-[1em] text-xs text-amber-600"
                    fill="currentColor"
                    viewBox="0 0 512 512"
                  >
                    <path d="M256 0a256 256 0 1 1 0 512 256 256 0 1 1 0-512zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
                  </svg>
                  <span className="text-xs font-semibold text-amber-600">
                    {order.isPaid ? "Paid" : "Processing"}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                  <svg
                    className="h-[1em] text-xs text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 512 512"
                  >
                    <path d="M214.7 .7c17.3 3.7 28.3 20.7 24.6 38l-19.1 89.3 126.5 0 22-102.7C372.4 8 389.4-3 406.7 .7s28.3 20.7 24.6 38L412.2 128 480 128c17.7 0 32 14.3 32 32s-14.3 32-32 32l-81.6 0-27.4 128 67.8 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-81.6 0-22 102.7c-3.7 17.3-20.7 28.3-38 24.6s-28.3-20.7-24.6-38l19.1-89.3-126.5 0-22 102.7c-3.7 17.3-20.7 28.3-38 24.6s-28.3-20.7-24.6-38L99.8 384 32 384c-17.7 0-32-14.3-32-32s14.3-32 32-32l81.6 0 27.4-128-67.8 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l81.6 0 22-102.7C180.4 8 197.4-3 214.7 .7zM206.4 192l-27.4 128 126.5 0 27.4-128-126.5 0z" />
                  </svg>
                  {order.id}
                </h3>
              </div>
              <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-gray-100">
                <svg
                  className="h-[1em] text-gray-600"
                  fill="currentColor"
                  viewBox="0 0 512 512"
                >
                  <path d="M64 64C28.7 64 0 92.7 0 128L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64L64 64zm192 96a96 96 0 1 1 0 192 96 96 0 1 1 0-192zm192 24c0 4.4-3.6 8.1-8 7.5-29-3.6-51.9-26.6-55.5-55.5-.5-4.4 3.1-8 7.5-8l48 0c4.4 0 8 3.6 8 8l0 48zM64 328c0-4.4 3.6-8.1 8-7.5 29 3.6 51.9 26.6 55.5 55.5 .5 4.4-3.1 8-7.5 8l-48 0c-4.4 0-8-3.6-8-8l0-48zm8-136.5c-4.4 .5-8-3.1-8-7.5l0-48c0-4.4 3.6-8 8-8l48 0c4.4 0 8.1 3.6 7.5 8-3.6 29-26.6 51.9-55.5 55.5zm368 129c4.4-.5 8 3.1 8 7.5l0 48c0 4.4-3.6 8-8 8l-48 0c-4.4 0-8.1-3.6-7.5-8 3.6-29 26.6-51.9 55.5-55.5z" />
                </svg>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1.5">
                <svg
                  className="h-[1em] text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 448 512"
                >
                  <path d="M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 32 0c35.3 0 64 28.7 64 64l0 288c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 128C0 92.7 28.7 64 64 64l32 0 0-32c0-17.7 14.3-32 32-32z" />
                </svg>
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span className="flex items-center gap-1.5">
                {order.cartItems.length} items
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span className="flex items-center gap-1.5">
                {order.shippingAddress?.city}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="text-2xl font-bold text-gray-900">
                  {order.totalOrderPrice}
                </span>
                <span className="text-sm font-medium text-gray-400 ml-1">
                  EGP
                </span>
              </div>
              <button
                onClick={() => setIsOpent(!isOpent)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${isOpent ? "bg-[#16A34A] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                {isOpent ? "Hide" : "Details"}
                <svg
                  className={`h-[1em] text-xs transition-transform duration-300 ${isOpent ? "rotate-180" : ""}`}
                  fill="currentColor"
                  viewBox="0 0 448 512"
                >
                  <path d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {isOpent && (
        <div className="border-t border-gray-100 bg-gray-50/50">
          <div className="p-5 sm:p-6">
            <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-lg bg-green-100 flex items-center justify-center">
                <svg
                  className="h-[1em] text-xs text-green-600"
                  fill="currentColor"
                  viewBox="0 0 384 512"
                >
                  <path d="M14 2.2C22.5-1.7 32.5-.3 39.6 5.8L80 40.4 120.4 5.8c9-7.7 22.3-7.7 31.2 0L192 40.4 232.4 5.8c9-7.7 22.2-7.7 31.2 0L304 40.4 344.4 5.8c7.1-6.1 17.1-7.5 25.6-3.6S384 14.6 384 24l0 464c0 9.4-5.5 17.9-14 21.8s-18.5 2.5-25.6-3.6l-40.4-34.6-40.4 34.6c-9 7.7-22.2-7.7-31.2 0l-40.4-34.6-40.4 34.6c-9 7.7-22.3-7.7-31.2 0L80 471.6 39.6 506.2c-7.1 6.1-17.1 7.5-25.6 3.6S0 497.4 0 488L0 24C0 14.6 5.5 6.1 14 2.2z" />
                </svg>
              </div>
              Order Items
            </h4>
            <div className="space-y-3">
              {order.cartItems.map((item: any) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100"
                >
                  <div className="w-16 h-16 rounded-xl bg-gray-50 p-2 shrink-0">
                    <Image
                      width={100}
                      height={100}
                      alt={item.product.title}
                      className="w-full h-full object-contain"
                      src={item.product.imageCover}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {item.product.title}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      <span className="font-medium text-gray-700">
                        {item.count}
                      </span>{" "}
                      × {item.price} EGP
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-lg font-bold text-gray-900">
                      {item.count * item.price}
                    </p>
                    <p className="text-xs text-gray-400">EGP</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="px-5 sm:px-6 pb-5 sm:pb-6 grid sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-xl border border-gray-100">
              <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center">
                  <svg
                    className="h-[1em] text-xs text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 384 512"
                  >
                    <path d="M0 188.6C0 84.4 86 0 192 0S384 84.4 384 188.6c0 119.3-120.2 262.3-170.4 316.8-11.8 12.8-31.5 12.8-43.3 0-50.2-54.5-170.4-197.5-170.4-316.8zM192 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128z" />
                  </svg>
                </div>
                Delivery Address
              </h4>
              <div className="space-y-2">
                <p className="font-medium text-gray-900">
                  {order.shippingAddress?.city}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {order.shippingAddress?.details}
                </p>
                <p className="text-sm text-gray-600 flex items-center gap-2 pt-1">
                  <svg
                    className="h-[1em] text-xs text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 512 512"
                  >
                    <path d="M160.2 25C152.3 6.1 131.7-3.9 112.1 1.4l-5.5 1.5c-64.6 17.6-119.8 80.2-103.7 156.4 37.1 175 174.8 312.7 349.8 349.8 76.3 16.2 138.8-39.1 156.4-103.7l1.5-5.5c5.4-19.7-4.7-40.3-23.5-48.1l-97.3-40.5c-16.5-6.9-35.6-2.1-47 11.8l-38.6 47.2C233.9 335.4 177.3 277 144.8 205.3L189 169.3c13.9-11.3 18.6-30.4 11.8-47L160.2 25z" />
                  </svg>
                  {order.shippingAddress?.phone}
                </p>
              </div>
            </div>
            <div
              style={{ backgroundColor: "#FEF3C6" }}
              className="p-4 rounded-xl border-amber-200"
            >
              <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-lg bg-amber-500 flex items-center justify-center">
                  <svg
                    className="h-[1em] text-xs text-white"
                    fill="currentColor"
                    viewBox="0 0 512 512"
                  >
                    <path d="M256 0a256 256 0 1 1 0 512 256 256 0 1 1 0-512zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
                  </svg>
                </div>
                Order Summary
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">
                    {order.totalOrderPrice} EGP
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <hr className="border-gray-200/50 my-2" />
                <div className="flex justify-between pt-1">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-bold text-lg text-gray-900">
                    {order.totalOrderPrice} EGP
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// المكون الأساسي
export default function Allorders({ dataUser }: { dataUser: any }) {
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link className="hover:text-primary-600 transition" href="/">
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">My Orders</span>
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-green-600 flex items-center justify-center shadow-lg shadow-primary-500/25">
                <svg
                  className="h-[1em] text-2xl text-white"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M369.4 128l-34.3-48-222.1 0-34.3 48 290.7 0zM0 148.5c0-13.3 4.2-26.3 11.9-37.2L60.9 42.8C72.9 26 92.3 16 112.9 16l222.1 0c20.7 0 40.1 10 52.1 26.8l48.9 68.5c7.8 10.9 11.9 23.9 11.9 37.2L448 416c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 148.5z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  My Orders
                </h1>
                <p className="text-gray-500 text-sm mt-0.5">
                  Track and manage your {dataUser?.length || 0} orders
                </p>
              </div>
            </div>
            <Link
              className="self-start sm:self-auto text-green-600 hover:text-green-700 font-medium flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-green-50 transition-all text-sm"
              href="/"
            >
              <svg
                className="h-[1em] text-xs"
                fill="currentColor"
                viewBox="0 0 448 512"
              >
                <path d="M160 80c0-35.3 28.7-64 64-64s64 28.7 64 64l0 48-128 0 0-48zm-48 48l-64 0c-26.5 0-48 21.5-48 48L0 384c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-208c0-26.5-21.5-48-48-48l-64 0 0-48c0-61.9-50.1-112-112-112S112 18.1 112 80l0 48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z" />
              </svg>
              Continue Shopping
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          {dataUser?.map((order: any) => (
            <OrderRow key={order._id} order={order} />
          ))}
        </div>
      </div>
    </>
  );
}
