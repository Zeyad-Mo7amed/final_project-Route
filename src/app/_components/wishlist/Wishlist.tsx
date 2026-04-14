"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import { deleteItemWichtes } from "@/api/wishlist/delete.wishlist.api";
import { useState } from "react";
import Swal from "sweetalert2";
import Link from "next/link";
import { addToCart } from "@/api/cart/actions/addcart.action";
import { toast } from "sonner";
import Image from "next/image";

export default function Wishlist() {
  const queryClient = useQueryClient();
  const [currentlyProcessing, setCurrentlyProcessing] = useState<string | null>(
    null,
  );
  const [cartLoadingId, setCartLoadingId] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const response = await fetch("/api/wishlist");
      if (!response.ok) throw new Error("Failed to fetch wishlist data");
      return response.json();
    },
  });

  const { mutate: delMutate } = useMutation({
    mutationFn: deleteItemWichtes,
    onMutate: (productId: string) => setCurrentlyProcessing(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      setCurrentlyProcessing(null);
      toast.success("Item removed from wishlist");
    },
    onError: () => setCurrentlyProcessing(null),
  });

  const { mutate: addToCartMutate } = useMutation({
    mutationFn: addToCart,
    onMutate: (productId: string) => setCartLoadingId(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] }); // تحديث عداد الكارت فوق
      setCartLoadingId(null);
      toast.success("Item added to cart successfully! 🛒");
    },
    onError: () => {
      setCartLoadingId(null);
      toast.error("Failed to add item to cart");
    },
  });

  const confirmDelete = (id: string, title: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Remove "${title}" from wishlist?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) delMutate(id);
    });
  };

  if (isLoading) return <Loading />;

  const products = data?.data || [];

  if (products.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50/50">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-sm mx-auto text-center">
            <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-6">
              <svg
                data-prefix="far"
                data-icon="heart"
                className="h-[1em] svg-inline--fa fa-heart text-3xl text-gray-400"
                role="img"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M378.9 80c-27.3 0-53 13.1-69 35.2l-34.4 47.6c-4.5 6.2-11.7 9.9-19.4 9.9s-14.9-3.7-19.4-9.9l-34.4-47.6c-16-22.1-41.7-35.2-69-35.2-47 0-85.1 38.1-85.1 85.1 0 49.9 32 98.4 68.1 142.3 41.1 50 91.4 94 125.9 120.3 3.2 2.4 7.9 4.2 14 4.2s10.8-1.8 14-4.2c34.5-26.3 84.8-70.4 125.9-120.3 36.2-43.9 68.1-92.4 68.1-142.3 0-47-38.1-85.1-85.1-85.1zM271 87.1c25-34.6 65.2-55.1 107.9-55.1 73.5 0 133.1 59.6 133.1 133.1 0 68.6-42.9 128.9-79.1 172.8-44.1 53.6-97.3 100.1-133.8 127.9-12.3 9.4-27.5 14.1-43.1 14.1s-30.8-4.7-43.1-14.1C176.4 438 123.2 391.5 79.1 338 42.9 294.1 0 233.7 0 165.1 0 91.6 59.6 32 133.1 32 175.8 32 216 52.5 241 87.1l15 20.7 15-20.7z"
                ></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Browse products and save your favorites here.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#16a34a] text-white font-semibold hover:bg-green-700 transition-colors"
                href="/"
              >
                Browse Products
                <svg
                  data-prefix="fas"
                  data-icon="arrow-right"
                  className="h-[1em] svg-inline--fa fa-arrow-right text-sm"
                  role="img"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-105.4 105.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10 font-sans" dir="ltr">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="text-gray-400 text-sm mb-2">
            Home / <span className="text-gray-600">Wishlist</span>
          </p>
          <div className="flex items-center gap-4">
            <div className="bg-white p-3 rounded-2xl shadow-sm">
              <span className="text-red-500 text-2xl">❤️</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">My Wishlist</h1>
              <p className="text-gray-500 text-sm">
                {products.length} items saved
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden">
          <div className="hidden md:grid grid-cols-12 gap-4 bg-gray-50/50 p-5 border-b border-gray-100 text-gray-400 text-sm font-medium">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Status</div>
            <div className="col-span-2 text-center">Actions</div>
          </div>

          <div className="divide-y divide-gray-100">
            {products.map((product: any) => (
              <div
                key={product._id}
                className="grid px-5 py-5 grid-cols-1 md:grid-cols-12 gap-4 items-center hover:bg-gray-50/30 transition-colors"
              >
                <div className="col-span-6 flex flex-col md:flex-row items-center gap-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      width={100}
                      height={100}
                      src={product.imageCover}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="font-semibold text-slate-800 text-[15px] mb-1">
                      {product.title}
                    </h3>
                    <p className="text-gray-400 text-xs">
                      {product.category?.name}
                    </p>
                  </div>
                </div>

                <div className="col-span-2 text-center font-bold text-slate-900">
                  {product.price} EGP
                </div>

                <div className="col-span-2 text-center">
                  <span className="py-1 px-3 rounded-full bg-green-50 text-green-600 text-[11px] font-medium border border-green-100">
                    In Stock
                  </span>
                </div>

                <div className="col-span-2 flex flex-col md:flex-row gap-2 w-full">
                  <button
                    onClick={() => addToCartMutate(product._id)}
                    disabled={cartLoadingId === product._id}
                    className="flex-1 cursor-pointer bg-[#16a34a] hover:bg-green-700 text-white text-sm font-medium py-2.5 rounded-xl flex items-center justify-center transition-all active:scale-95"
                  >
                    {cartLoadingId === product._id ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
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
                          ></path>
                        </svg>

                        
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => confirmDelete(product._id, product.title)}
                    disabled={currentlyProcessing === product._id}
                    className="flex-1 flex justify-center cursor-pointer p-2.5 border border-gray-200 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                  >
                    {currentlyProcessing === product._id ? (
                      <div className="w-4 h-4 border-2 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
