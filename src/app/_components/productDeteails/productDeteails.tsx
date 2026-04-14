"use client";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import React, { useState, useRef, useEffect } from "react";
import {
  FaMinus,
  FaPlus,
  FaRegStar,
  FaStar,
  FaStarHalfAlt,
} from "react-icons/fa";
import ProductItem from "../ProductItem/Product.Item";
import { addToCart } from "@/api/cart/actions/addcart.action";
import { productInterface } from "@/interfaces/product.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToWishlist } from "@/api/wishlist/wishlist.add.api";
import { toast } from "sonner";

export default function ProductDeteails({
  data,
  allData,
}: {
  data: productInterface;
  allData: productInterface[];
}) {

    const [showCheck, setShowCheck] = useState(false);
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
      mutationFn: () => addToWishlist(data._id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["wishlist"] });
        toast.success("Product added successfully to your wishlist");
        setShowCheck(true);
        setTimeout(() => {
          setShowCheck(false);
        }, 2000);
      },
      onError: (error) => {
        toast.error("Something went wrong");
        console.error(error);
      },
    });

  const images = [data.imageCover, ...data.images];
  const [activeTab, setActiveTab] = useState("details");
  const [mainImage, setMainImage] = useState(images[0]);
  const [qty, setQty] = useState(1);

  const thumbsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    setMainImage(images[0]);
    setQty(1);
  }, [data]);

  const handleClick = (img: string, index: number) => {
    setMainImage(img);

    thumbsRef.current[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  const ratingStats = [5, 4, 3, 2, 1].map((star) => {
    const reviewsList = data?.reviews || [];

    const count = reviewsList.filter((r) => r.rating === star).length;

    const total = reviewsList.length;
    const percentage = total > 0 ? (count / total) * 100 : 0;

    return { star, count, percentage };
  });

  return (
    <>
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/4">
              <div className="bg-white rounded-xl shadow-sm p-4 sticky top-4">
                <div className="mb-4">
                  <Image
                    src={mainImage}
                    alt="Product"
                    width={300}
                    height={288}
                    className="w-full h-auto object-contain"
                  />
                </div>

                <div
                  className="flex gap-3 overflow-x-hidden pb-2"
                  style={{ WebkitOverflowScrolling: "touch" }}
                >
                  {images.map((img: string, index: number) => (
                    <button
                      title="dasf"
                      key={index}
                      ref={(el) => {
                        thumbsRef.current[index] = el;
                      }}
                      onClick={() => handleClick(img, index)}
                      className={`flex-shrink-0 w-20 border-4 rounded-md ${
                        mainImage === img
                          ? "border-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      <Image
                        width={100}
                        height={80}
                        src={img}
                        alt={`thumb-${index}`}
                        className="w-full h-auto object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:w-3/4">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Link
                    className="bg-[#f0fdf4] hover:bg-[#DCFCE7] text-[#15803d] text-xs px-3 py-1.5 rounded-full transition"
                    href="/categories/6439d58a0049ad0b52b9003f"
                  >
                    {data.category.name}
                  </Link>

                  <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full">
                    {data.brand.name}
                  </span>
                </div>

                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                  {data.title}
                </h1>

                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 flex">
                    {[1, 2, 3, 4, 5].map((star) =>
                      data.ratingsAverage >= star ? (
                        <FaStar key={star} />
                      ) : data.ratingsAverage >= star - 0.5 ? (
                        <FaStarHalfAlt key={star} />
                      ) : (
                        <FaRegStar key={star} />
                      ),
                    )}
                  </div>

                  <span className="text-xs  text-gray-500 ml-2">
                    {data.ratingsAverage} ({data.ratingsQuantity} reviews)
                  </span>
                </div>

                <div>
                  {data.priceAfterDiscount ? (
                    <div className="">
                      <span className="text-lg py-5 text-green-600 font-bold text-gray-800 fs-">
                        {data.priceAfterDiscount} EGP
                      </span>
                    </div>
                  ) : (
                    <span className="text-3xl py-5 font-bold text-gray-800">
                      {data.price} EGP
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 mb-6 mt-4">
                  <span className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-green-50 text-green-700">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    In Stock
                  </span>
                </div>

                <div className="border-t border-gray-100 pt-5 mb-6">
                  <p className="text-gray-600 leading-relaxed">
                    {data.description}
                  </p>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
                      <button
                        title="setqty"
                        onClick={() =>
                          setQty((prev) => (prev > 1 ? prev - 1 : 1))
                        }
                        className="px-4 py-3 text-gray-600 hover:bg-gray-100 transition"
                      >
                        <FaMinus />
                      </button>

                      <input
                        min={1}
                        max={225}
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                        className="w-16 text-center border-0 focus:ring-0 focus:outline-none text-lg font-medium appearance-none"
                        type="number"
                      />

                      <button
                        title="FaPlus"
                        onClick={() => setQty((prev) => prev + 1)}
                        className="px-4 py-3 text-gray-600 hover:bg-gray-100 transition"
                      >
                        <FaPlus />
                      </button>
                    </div>

                    <span className="text-sm text-gray-500">225 available</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Price:</span>
                    {data.priceAfterDiscount ? (
                      <span className="text-green-600 text-3xl font-bold text-primary-600">
                        {data.priceAfterDiscount * qty}.00 EGP
                      </span>
                    ) : (
                      <span className="text-green-600 text-3xl font-bold text-primary-600">
                        {data.price * qty}.00 EGP
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <button
                    onClick={() => addToCart(data._id)}
                    id="add-to-cart"
                    className="flex-1 hover:bg-[#15803D] bg-green-600 text-white py-3.5 px-6 rounded-xl font-medium hover:bg-primary-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary-600/25 bg-primary-600"
                  >
                    <svg
                      data-prefix="fas"
                      data-icon="cart-shopping"
                      className="h-[1em] svg-inline--fa fa-cart-shopping"
                      role="img"
                      viewBox="0 0 640 512"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M24-16C10.7-16 0-5.3 0 8S10.7 32 24 32l45.3 0c3.9 0 7.2 2.8 7.9 6.6l52.1 286.3c6.2 34.2 36 59.1 70.8 59.1L456 384c13.3 0 24-10.7 24-24s-10.7-24-24-24l-255.9 0c-11.6 0-21.5-8.3-23.6-19.7l-5.1-28.3 303.6 0c30.8 0 57.2-21.9 62.9-52.2L568.9 69.9C572.6 50.2 557.5 32 537.4 32l-412.7 0-.4-2c-4.8-26.6-28-46-55.1-46L24-16zM208 512a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm224 0a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"
                      />
                    </svg>
                    Add to Cart
                  </button>
                  <button
                    id="buy-now"
                    className="flex-1 bg-gray-900 text-white py-3.5 px-6 rounded-xl font-medium hover:bg-gray-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <svg
                      data-prefix="fas"
                      data-icon="bolt"
                      className="h-[1em] svg-inline--fa fa-bolt"
                      role="img"
                      viewBox="0 0 448 512"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M338.8-9.9c11.9 8.6 16.3 24.2 10.9 37.8L271.3 224 416 224c13.5 0 25.5 8.4 30.1 21.1s.7 26.9-9.6 35.5l-288 240c-11.3 9.4-27.4 9.9-39.3 1.3s-16.3-24.2-10.9-37.8L176.7 288 32 288c-13.5 0-25.5-8.4-30.1-21.1s-.7-26.9 9.6-35.5l288-240c11.3-9.4 27.4-9.9 39.3-1.3z"
                      />
                    </svg>
                    Buy Now
                  </button>
                </div>

                <div className="flex gap-3 mb-6">
                  <button
                  onClick={() => mutate()}
                    id="wishlist-button"
                    className="flex-1 hover:border-green-600 duration-200 border-2 py-3 px-4 rounded-xl font-medium transition flex items-center justify-center gap-2 border-gray-200 text-gray-700 hover:border-primary-300 hover:text-primary-600"
                  >
                    <svg
                      data-prefix="far"
                      data-icon="heart"
                      className="h-[1em] svg-inline--fa fa-heart"
                      role="img"
                      viewBox="0 0 512 512"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M378.9 80c-27.3 0-53 13.1-69 35.2l-34.4 47.6c-4.5 6.2-11.7 9.9-19.4 9.9s-14.9-3.7-19.4-9.9l-34.4-47.6c-16-22.1-41.7-35.2-69-35.2-47 0-85.1 38.1-85.1 85.1 0 49.9 32 98.4 68.1 142.3 41.1 50 91.4 94 125.9 120.3 3.2 2.4 7.9 4.2 14 4.2s10.8-1.8 14-4.2c34.5-26.3 84.8-70.4 125.9-120.3 36.2-43.9 68.1-92.4 68.1-142.3 0-47-38.1-85.1-85.1-85.1zM271 87.1c25-34.6 65.2-55.1 107.9-55.1 73.5 0 133.1 59.6 133.1 133.1 0 68.6-42.9 128.9-79.1 172.8-44.1 53.6-97.3 100.1-133.8 127.9-12.3 9.4-27.5 14.1-43.1 14.1s-30.8-4.7-43.1-14.1C176.4 438 123.2 391.5 79.1 338 42.9 294.1 0 233.7 0 165.1 0 91.6 59.6 32 133.1 32 175.8 32 216 52.5 241 87.1l15 20.7 15-20.7z"
                      />
                    </svg>
                    Add to Wishlist
                  </button>
                  <button
                    title="share-nodes"
                    className="border-2 hover:border-green-600 duration-200 border-gray-200 text-gray-700 py-3 px-4 rounded-xl hover:border-primary-300 hover:text-primary-600 transition"
                  >
                    <svg
                      data-prefix="fas"
                      data-icon="share-nodes"
                      className="h-[1em] svg-inline--fa fa-share-nodes"
                      role="img"
                      viewBox="0 0 512 512"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M384 192c53 0 96-43 96-96s-43-96-96-96-96 43-96 96c0 5.4 .5 10.8 1.3 16L159.6 184.1c-16.9-15-39.2-24.1-63.6-24.1-53 0-96 43-96 96s43 96 96 96c24.4 0 46.6-9.1 63.6-24.1L289.3 400c-.9 5.2-1.3 10.5-1.3 16 0 53 43 96 96 96s96-43 96-96-43-96-96-96c-24.4 0-46.6 9.1-63.6 24.1L190.7 272c.9-5.2 1.3-10.5 1.3-16s-.5-10.8-1.3-16l129.7-72.1c16.9 15 39.2 24.1 63.6 24.1z"
                      />
                    </svg>
                  </button>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 bg-[#DCFCE7] w-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center shrink-0">
                        <svg
                          data-prefix="fas"
                          data-icon="truck-fast"
                          className=" w-[20px] text-green-700 svg-inline--fa fa-truck-fast"
                          role="img"
                          viewBox="0 0 640 512"
                          aria-hidden="true"
                        >
                          <path
                            fill="currentColor"
                            d="M64 96c0-35.3 28.7-64 64-64l288 0c35.3 0 64 28.7 64 64l0 32 50.7 0c17 0 33.3 6.7 45.3 18.7L621.3 192c12 12 18.7 28.3 18.7 45.3L640 384c0 35.3-28.7 64-64 64l-3.3 0c-10.4 36.9-44.4 64-84.7 64s-74.2-27.1-84.7-64l-102.6 0c-10.4 36.9-44.4 64-84.7 64s-74.2-27.1-84.7-64l-3.3 0c-35.3 0-64-28.7-64-64l0-48-40 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L24 240c-13.3 0-24-10.7-24-24s10.7-24 24-24l176 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L24 144c-13.3 0-24-10.7-24-24S10.7 96 24 96l40 0zM576 288l0-50.7-45.3-45.3-50.7 0 0 96 96 0zM256 424a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm232 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">
                          Free Delivery
                        </h4>
                        <p className="text-xs text-gray-500">Orders over $50</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-10 bg-[#DCFCE7] w-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center shrink-0">
                        <svg
                          data-prefix="fas"
                          data-icon="arrow-rotate-left"
                          className=" w-[20px] text-green-700 svg-inline--fa fa-arrow-rotate-left"
                          role="img"
                          viewBox="0 0 512 512"
                          aria-hidden="true"
                        >
                          <path
                            fill="currentColor"
                            d="M256 64c-56.8 0-107.9 24.7-143.1 64l47.1 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 192c-17.7 0-32-14.3-32-32L0 32C0 14.3 14.3 0 32 0S64 14.3 64 32l0 54.7C110.9 33.6 179.5 0 256 0 397.4 0 512 114.6 512 256S397.4 512 256 512c-87 0-163.9-43.4-210.1-109.7-10.1-14.5-6.6-34.4 7.9-44.6s34.4-6.6 44.6 7.9c34.8 49.8 92.4 82.3 157.6 82.3 106 0 192-86 192-192S362 64 256 64z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">
                          30 Days Return
                        </h4>
                        <p className="text-xs text-gray-500">Money back</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-10 bg-[#DCFCE7] w-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center shrink-0">
                        <svg
                          data-prefix="fas"
                          data-icon="shield-halved"
                          className="w-[20px] text-green-700 svg-inline--fa fa-shield-halved"
                          role="img"
                          viewBox="0 0 512 512"
                          aria-hidden="true"
                        >
                          <path
                            fill="currentColor"
                            d="M256 0c4.6 0 9.2 1 13.4 2.9L457.8 82.8c22 9.3 38.4 31 38.3 57.2-.5 99.2-41.3 280.7-213.6 363.2-16.7 8-36.1 8-52.8 0-172.4-82.5-213.1-264-213.6-363.2-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.9 1 251.4 0 256 0zm0 66.8l0 378.1c138-66.8 175.1-214.8 176-303.4l-176-74.6 0 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">
                          Secure Payment
                        </h4>
                        <p className="text-xs text-gray-500">100% Protected</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="product-details-tabs" className="py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex overflow-x-auto scrollbar-hide">
                {/* Product Details */}
                <button
                  onClick={() => setActiveTab("details")}
                  className={`hover:text-green-600 cursor-pointer flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-all duration-200 ${
                    activeTab === "details"
                      ? "text-green-600 border-b-2 border-primary-600 bg-primary-50/50"
                      : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                  }`}
                >
                  <svg
                    className="text-sm"
                    viewBox="0 0 448 512"
                    width="16"
                    fill="currentColor"
                  >
                    <path d="M369.4 128l-34.3-48-222.1 0-34.3 48 290.7 0zM0 148.5c0-13.3 4.2-26.3 11.9-37.2L60.9 42.8C72.9 26 92.3 16 112.9 16l222.1 0c20.7 0 40.1 10 52.1 26.8l48.9 68.5c7.8 10.9 11.9 23.9 11.9 37.2L448 416c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 148.5z" />
                  </svg>
                  Product Details
                </button>

                {/* Reviews */}
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`flex hover:text-green-600 cursor-pointer items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-all duration-200 ${
                    activeTab === "reviews"
                      ? "text-green-600 border-b-2 border-primary-600 bg-primary-50/50"
                      : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                  }`}
                >
                  <svg
                    className="text-sm"
                    viewBox="0 0 576 512"
                    width="16"
                    fill="currentColor"
                  >
                    <path d="M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z" />
                  </svg>
                  Reviews ({data.ratingsQuantity})
                </button>

                {/* Shipping */}
                <button
                  onClick={() => setActiveTab("shipping")}
                  className={`flex hover:text-green-600 cursor-pointer items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-all duration-200 ${
                    activeTab === "shipping"
                      ? "text-green-600 border-b-2 border-primary-600 bg-primary-50/50"
                      : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                  }`}
                >
                  <svg
                    className="text-sm"
                    viewBox="0 0 576 512"
                    width="16"
                    fill="currentColor"
                  >
                    <path d="M0 96C0 60.7 28.7 32 64 32l288 0c35.3 0 64 28.7 64 64l0 32 50.7 0c17 0 33.3 6.7 45.3 18.7L557.3 192c12 12 18.7 28.3 18.7 45.3L576 384c0 35.3-28.7 64-64 64l-3.3 0c-10.4 36.9-44.4 64-84.7 64s-74.2-27.1-84.7-64l-102.6 0c-10.4 36.9-44.4 64-84.7 64s-74.2-27.1-84.7-64L64 448c-35.3 0-64-28.7-64-64L0 96z" />
                  </svg>
                  Shipping & Returns
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {activeTab === "details" && (
                <div className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        About this Product
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {data.description}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">
                          Product Information
                        </h4>
                        <ul className="space-y-2">
                          <li className="flex justify-between text-sm">
                            <span className="text-gray-500">Category</span>
                            <span className="text-gray-900 font-medium">
                              {data.category.name}
                            </span>
                          </li>
                          <li className="flex justify-between text-sm">
                            <span className="text-gray-500">Subcategory</span>
                            <span className="text-gray-900 font-medium">
                              {data.subcategory[0].name}
                            </span>
                          </li>
                          <li className="flex justify-between text-sm">
                            <span className="text-gray-500">Brand</span>
                            <span className="text-gray-900 font-medium">
                              {data.brand.name}
                            </span>
                          </li>
                          <li className="flex justify-between text-sm">
                            <span className="text-gray-500">Items Sold</span>
                            <span className="text-gray-900 font-medium">
                              {data.sold}+ sold
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">
                          Key Features
                        </h4>
                        <ul className="space-y-2">
                          <li className="flex items-center text-sm text-gray-600">
                            <svg
                              data-prefix="fas"
                              data-icon="check"
                              className="svg-inline--fa fa-check text-primary-600 mr-2 w-4"
                              role="img"
                              viewBox="0 0 448 512"
                              aria-hidden="true"
                            >
                              <path
                                fill="currentColor"
                                d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"
                              />
                            </svg>
                            Premium Quality Product
                          </li>
                          <li className="flex items-center text-sm text-gray-600">
                            <svg
                              data-prefix="fas"
                              data-icon="check"
                              className="svg-inline--fa fa-check text-primary-600 mr-2 w-4"
                              role="img"
                              viewBox="0 0 448 512"
                              aria-hidden="true"
                            >
                              <path
                                fill="currentColor"
                                d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"
                              />
                            </svg>
                            100% Authentic Guarantee
                          </li>
                          <li className="flex items-center text-sm text-gray-600">
                            <svg
                              data-prefix="fas"
                              data-icon="check"
                              className="svg-inline--fa fa-check text-primary-600 mr-2 w-4"
                              role="img"
                              viewBox="0 0 448 512"
                              aria-hidden="true"
                            >
                              <path
                                fill="currentColor"
                                d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"
                              />
                            </svg>
                            Fast &amp; Secure Packaging
                          </li>
                          <li className="flex items-center text-sm text-gray-600">
                            <svg
                              data-prefix="fas"
                              data-icon="check"
                              className="svg-inline--fa fa-check text-primary-600 mr-2 w-4"
                              role="img"
                              viewBox="0 0 448 512"
                              aria-hidden="true"
                            >
                              <path
                                fill="currentColor"
                                d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"
                              />
                            </svg>
                            Quality Tested
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="p-6">
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-gray-900 mb-2">
                          {data.ratingsAverage}
                        </div>
                        <div className="text-yellow-400 flex items-center justify-center gap-1">
                          <div className="text-yellow-400 flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) =>
                              data.ratingsAverage >= star ? (
                                <FaStar key={star} />
                              ) : data.ratingsAverage >= star - 0.5 ? (
                                <FaStarHalfAlt key={star} />
                              ) : (
                                <FaRegStar key={star} />
                              ),
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          Based on {data.ratingsQuantity} reviews
                        </p>
                      </div>
                      <div className="flex-1 w-full">
                        {ratingStats.map((item) => (
                          <div
                            key={item.star}
                            className="flex items-center gap-3 mb-2"
                          >
                            <span className="text-sm text-gray-600 w-8">
                              {item.star} star
                            </span>

                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                                style={{ width: `${item.percentage}%` }}
                              />
                            </div>

                            <span className="text-sm text-gray-500 w-10">
                              {item.percentage.toFixed(0)}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="border-t border-gray-200 pt-6">
                      <div className="text-center py-8">
                        <svg
                          data-prefix="fas"
                          data-icon="star"
                          className=" h-[1em] text-center mx-auto svg-inline--fa fa-star text-4xl text-gray-300 mb-3"
                          role="img"
                          viewBox="0 0 576 512"
                          aria-hidden="true"
                        >
                          <path
                            fill="currentColor"
                            d="M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z"
                          />
                        </svg>
                        <p className="text-gray-500">
                          Customer reviews will be displayed here.
                        </p>
                        <button className="mt-4 hover:text-green-700 duration-200 text-green-400 hover:text-primary-700 font-medium">
                          Write a Review
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "shipping" && (
                <div className="p-6">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-linear-to-br from-primary-50 to-primary-100 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="h-12 w-12  bg-[#16A34A] text-white rounded-full flex items-center justify-center">
                            <svg
                              data-prefix="fas"
                              data-icon="truck"
                              className="h-[1em] svg-inline--fa fa-truck text-xl"
                              role="img"
                              viewBox="0 0 576 512"
                              aria-hidden="true"
                            >
                              <path
                                fill="currentColor"
                                d="M0 96C0 60.7 28.7 32 64 32l288 0c35.3 0 64 28.7 64 64l0 32 50.7 0c17 0 33.3 6.7 45.3 18.7L557.3 192c12 12 18.7 28.3 18.7 45.3L576 384c0 35.3-28.7 64-64 64l-3.3 0c-10.4 36.9-44.4 64-84.7 64s-74.2-27.1-84.7-64l-102.6 0c-10.4 36.9-44.4 64-84.7 64s-74.2-27.1-84.7-64L64 448c-35.3 0-64-28.7-64-64L0 96zM512 288l0-50.7-45.3-45.3-50.7 0 0 96 96 0zM192 424a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm232 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"
                              />
                            </svg>
                          </div>
                          <h4 className="font-semibold text-gray-900">
                            Shipping Information
                          </h4>
                        </div>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-2 text-sm text-gray-700">
                            <svg
                              data-prefix="fas"
                              data-icon="check"
                              className="h-[1em] svg-inline--fa fa-check text-primary-600 mt-0.5"
                              role="img"
                              viewBox="0 0 448 512"
                              aria-hidden="true"
                            >
                              <path
                                fill="currentColor"
                                d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"
                              />
                            </svg>
                            <span>Free shipping on orders over $50</span>
                          </li>
                          <li className="flex items-start gap-2 text-sm text-gray-700">
                            <svg
                              data-prefix="fas"
                              data-icon="check"
                              className="h-[1em] svg-inline--fa fa-check text-primary-600 mt-0.5"
                              role="img"
                              viewBox="0 0 448 512"
                              aria-hidden="true"
                            >
                              <path
                                fill="currentColor"
                                d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"
                              />
                            </svg>
                            <span>Standard delivery: 3-5 business days</span>
                          </li>
                          <li className="flex items-start gap-2 text-sm text-gray-700">
                            <svg
                              data-prefix="fas"
                              data-icon="check"
                              className="h-[1em] svg-inline--fa fa-check text-primary-600 mt-0.5"
                              role="img"
                              viewBox="0 0 448 512"
                              aria-hidden="true"
                            >
                              <path
                                fill="currentColor"
                                d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"
                              />
                            </svg>
                            <span>
                              Express delivery available (1-2 business days)
                            </span>
                          </li>
                          <li className="flex items-start gap-2 text-sm text-gray-700">
                            <svg
                              data-prefix="fas"
                              data-icon="check"
                              className="h-[1em] svg-inline--fa fa-check text-primary-600 mt-0.5"
                              role="img"
                              viewBox="0 0 448 512"
                              aria-hidden="true"
                            >
                              <path
                                fill="currentColor"
                                d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"
                              />
                            </svg>
                            <span>Track your order in real-time</span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-linear-to-br from-green-50 to-green-100 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="h-12 w-12 bg-green-600 text-white rounded-full flex items-center justify-center">
                            <svg
                              data-prefix="fas"
                              data-icon="rotate-left"
                              className="h-[1em] svg-inline--fa fa-rotate-left text-xl"
                              role="img"
                              viewBox="0 0 512 512"
                              aria-hidden="true"
                            >
                              <path
                                fill="currentColor"
                                d="M24 192l144 0c9.7 0 18.5-5.8 22.2-14.8s1.7-19.3-5.2-26.2l-46.7-46.7c75.3-58.6 184.3-53.3 253.5 15.9 75 75 75 196.5 0 271.5s-196.5 75-271.5 0c-10.2-10.2-19-21.3-26.4-33-9.5-14.9-29.3-19.3-44.2-9.8s-19.3 29.3-9.8 44.2C49.7 408.7 61.4 423.5 75 437 175 537 337 537 437 437S537 175 437 75C342.8-19.3 193.3-24.7 92.7 58.8L41 7C34.1 .2 23.8-1.9 14.8 1.8S0 14.3 0 24L0 168c0 13.3 10.7 24 24 24z"
                              />
                            </svg>
                          </div>
                          <h4 className="font-semibold text-gray-900">
                            Returns &amp; Refunds
                          </h4>
                        </div>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-2 text-sm text-gray-700">
                            <svg
                              data-prefix="fas"
                              data-icon="check"
                              className="h-[1em] svg-inline--fa fa-check text-green-600 mt-0.5"
                              role="img"
                              viewBox="0 0 448 512"
                              aria-hidden="true"
                            >
                              <path
                                fill="currentColor"
                                d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"
                              />
                            </svg>
                            <span>30-day hassle-free returns</span>
                          </li>
                          <li className="flex items-start gap-2 text-sm text-gray-700">
                            <svg
                              data-prefix="fas"
                              data-icon="check"
                              className="h-[1em] svg-inline--fa fa-check text-green-600 mt-0.5"
                              role="img"
                              viewBox="0 0 448 512"
                              aria-hidden="true"
                            >
                              <path
                                fill="currentColor"
                                d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"
                              />
                            </svg>
                            <span>Full refund or exchange available</span>
                          </li>
                          <li className="flex items-start gap-2 text-sm text-gray-700">
                            <svg
                              data-prefix="fas"
                              data-icon="check"
                              className="h-[1em] svg-inline--fa fa-check text-green-600 mt-0.5"
                              role="img"
                              viewBox="0 0 448 512"
                              aria-hidden="true"
                            >
                              <path
                                fill="currentColor"
                                d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"
                              />
                            </svg>
                            <span>Free return shipping on defective items</span>
                          </li>
                          <li className="flex items-start gap-2 text-sm text-gray-700">
                            <svg
                              data-prefix="fas"
                              data-icon="check"
                              className="h-[1em] svg-inline--fa fa-check text-green-600 mt-0.5"
                              role="img"
                              viewBox="0 0 448 512"
                              aria-hidden="true"
                            >
                              <path
                                fill="currentColor"
                                d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"
                              />
                            </svg>
                            <span>Easy online return process</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-6 flex items-center gap-4">
                      <div className="h-14 w-14 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center shrink-0">
                        <svg
                          data-prefix="fas"
                          data-icon="shield-halved"
                          className="h-[1em] svg-inline--fa fa-shield-halved text-2xl"
                          role="img"
                          viewBox="0 0 512 512"
                          aria-hidden="true"
                        >
                          <path
                            fill="currentColor"
                            d="M256 0c4.6 0 9.2 1 13.4 2.9L457.8 82.8c22 9.3 38.4 31 38.3 57.2-.5 99.2-41.3 280.7-213.6 363.2-16.7 8-36.1 8-52.8 0-172.4-82.5-213.1-264-213.6-363.2-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.9 1 251.4 0 256 0zm0 66.8l0 378.1c138-66.8 175.1-214.8 176-303.4l-176-74.6 0 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          Buyer Protection Guarantee
                        </h4>
                        <p className="text-sm text-gray-600">
                          {` Get a full refund if your order doesn't arrive or
                          isn't as described. We ensure your shopping experience
                          is safe and secure.`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="similar-products">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full" />
              <h2 className="text-2xl font-bold text-gray-800">
                You May Also <span className="text-emerald-600">Like</span>
              </h2>
            </div>

            <div className="flex space-x-2">
              <button
                title="chevron-left"
                className="prevBtn h-10 w-10 rounded-full bg-gray-100 flex hover:bg-[#DCFCE7] items-center justify-center text-gray-600 transition"
              >
                <svg
                  data-prefix="fas"
                  data-icon="chevron-left"
                  className="h-[1em] svg-inline--fa fa-chevron-left"
                  role="img"
                  viewBox="0 0 320 512"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
                  />
                </svg>
              </button>

              <button
                title="chevron-right"
                className="nextBtn h-10 w-10 rounded-full bg-gray-100 flex hover:bg-[#DCFCE7] items-center justify-center text-gray-600 transition"
              >
                <svg
                  data-prefix="fas"
                  data-icon="chevron-right"
                  className="h-[1em] svg-inline--fa fa-chevron-right"
                  role="img"
                  viewBox="0 0 320 512"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M311.1 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L243.2 256 73.9 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <Swiper
            className="flex"
            modules={[Navigation]}
            navigation={{
              nextEl: ".nextBtn",
              prevEl: ".prevBtn",
            }}
            spaceBetween={20}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
          >
            {allData
              .filter(
                (item: productInterface) =>
                  item.category.name === data.category.name,
              )
              .map((item: productInterface) => (
                <SwiperSlide key={item.id}>
                  <ProductItem product={item} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </section>
    </>
  );
}
