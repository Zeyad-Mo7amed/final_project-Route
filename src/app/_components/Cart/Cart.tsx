"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import Loading from "../Loading/Loading";
import { deleteItemCart } from "@/api/cart/actions/deletCart";
import { CartItem } from "@/interfaces/product.interface";
import Swal from "sweetalert2";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { updateCart } from "@/api/cart/actions/updateCart.api";
import { clearCart } from "@/api/cart/actions/clea.action";

export default function Cart() {
  const queryClient = useQueryClient();

  const [currentlyProcessing, setCurrentlyProcessing] = useState<string | null>(
    null,
  );

  const { data, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await fetch("/api/cart");
      if (!response.ok) throw new Error("Failed to fetch cart data");
      return response.json();
    },
  });

  

  const { mutate: delMutate } = useMutation({
    mutationFn: deleteItemCart,
    onMutate: (productId: string) => {
      setCurrentlyProcessing(productId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      setCurrentlyProcessing(null);
      Swal.fire({
        title: "Deleted!",
        text: "Item has been removed.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: () => {
      setCurrentlyProcessing(null);
    },
  });

  const { mutate: clearMutate } = useMutation({
    mutationFn: clearCart,
    onMutate: () => {
      setCurrentlyProcessing("all");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      setCurrentlyProcessing(null);
      Swal.fire({
        title: "Cleared!",
        text: "Your cart is now empty.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: () => {
      setCurrentlyProcessing(null);
    },
  });

  const { mutate: upDateMutate } = useMutation({
    mutationFn: updateCart,
    onMutate: (variables: { productId: string; count: number }) => {
      setCurrentlyProcessing(variables.productId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      setCurrentlyProcessing(null);
    },
    onError: () => {
      setCurrentlyProcessing(null);
    },
  });

  function handleUpdateCart(productId: string, count: number) {
    if (count < 1) return;
    upDateMutate({ productId, count });
  }

  const confirmDelete = (productId: string, productName: string) => {
    Swal.fire({
      title: "Remove Item?",
      html: `Remove <span class="font-semibold text-gray-700">${productName}</span> from your cart?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Remove",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      buttonsStyling: false,
      customClass: {
        popup: "rounded-2xl shadow-2xl border-0 p-0",
        confirmButton:
          "bg-red-600 cursor-pointer hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-xl transition-all mx-2 shadow-sm",
        cancelButton:
          "bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-8 rounded-xl transition-all mx-2",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        delMutate(productId);
      }
    });
  };

  const confirmClearCart = () => {
    Swal.fire({
      title: "Clear Cart?",
      html: `Are you sure you want to remove <span class="font-semibold text-gray-700">all items</span>?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, clear all",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      buttonsStyling: false,
      customClass: {
        popup: "rounded-2xl shadow-2xl border-0 p-0",
        confirmButton:
          "bg-red-600 cursor-pointer hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-xl transition-all mx-2 shadow-sm",
        cancelButton:
          "bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-8 rounded-xl transition-all mx-2",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        clearMutate();
      }
    });
  };

  if (isLoading) return <Loading />;

  const totalPrice = data?.data?.totalCartPrice || 0;
  const freeShippingLimit = 500;
  const isFreeShipping = totalPrice >= freeShippingLimit;
  const remainingForFreeShipping = freeShippingLimit - totalPrice;
  const shippingProgress = Math.min(
    (totalPrice / freeShippingLimit) * 100,
    100,
  );
  const shippingFees = isFreeShipping ? 0 : 50;

  return (
    <>
      {data?.numOfCartItems > 0 ? (
        <div className="bg-gray-50 min-h-screen py-8">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Link className="hover:text-primary-600 transition" href="/">
                  Home
                </Link>
                <span>/</span>
                <span className="text-gray-900 font-medium">Shopping Cart</span>
              </nav>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <span className="bg-gradient-to-r from-green-600 to-primary-700 text-white w-12 h-12 rounded-xl flex items-center justify-center">
                      <svg
                        className="h-[1em]"
                        viewBox="0 0 640 512"
                        fill="currentColor"
                      >
                        <path d="M24-16C10.7-16 0-5.3 0 8S10.7 32 24 32l45.3 0c3.9 0 7.2 2.8 7.9 6.6l52.1 286.3c6.2 34.2 36 59.1 70.8 59.1L456 384c13.3 0 24-10.7 24-24s-10.7-24-24-24l-255.9 0c-11.6 0-21.5-8.3-23.6-19.7l-5.1-28.3 303.6 0c30.8 0 57.2-21.9 62.9-52.2L568.9 69.9C572.6 50.2 557.5 32 537.4 32l-412.7 0-.4-2c-4.8-26.6-28-46-55.1-46L24-16zM208 512a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm224 0a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" />
                      </svg>
                    </span>
                    Shopping Cart
                  </h1>
                  <p className="text-gray-500 mt-2">
                    You have{" "}
                    <span className="font-semibold mx-1 text-green-600">
                      {data?.numOfCartItems} items
                    </span>{" "}
                    in your cart
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {data?.data?.products.map((item: CartItem) => (
                    <div
                      key={item.product._id}
                      className="relative overflow-hidden bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300"
                    >
                      {(currentlyProcessing === item.product._id ||
                        currentlyProcessing === "all") && (
                        <div className="absolute inset-0 z-50 bg-white/70 backdrop-blur-[2px] flex items-center justify-center animate-in fade-in duration-300">
                          <div className="bg-white px-6 py-3 rounded-full shadow-xl border border-gray-100 flex items-center gap-3">
                            <div className="relative w-5 h-5">
                              <Spinner />
                            </div>
                            <span className="text-sm font-bold text-gray-700 animate-pulse">
                              Updating...
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="p-4 sm:p-5">
                        <div className="flex gap-4 sm:gap-6">
                          <Link
                            className="relative shrink-0 group"
                            href={`/products/${item.product._id}`}
                          >
                            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl bg-gradient-to-br from-gray-50 via-white to-gray-100 p-3 border border-gray-100 overflow-hidden">
                              <Image
                                width={120}
                                height={120}
                                alt={item.product.title}
                                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                                src={item.product.imageCover}
                              />
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                              <svg
                                className="h-[1em]"
                                viewBox="0 0 448 512"
                                fill="currentColor"
                              >
                                <path d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z" />
                              </svg>
                              In Stock
                            </div>
                          </Link>

                          <div className="flex-1 min-w-0 flex flex-col">
                            <div className="mb-3">
                              <Link
                                className="group/title"
                                href={`/products/${item.product._id}`}
                              >
                                <h3 className="font-semibold text-gray-900 group-hover/title:text-primary-600 transition-colors leading-relaxed text-base sm:text-lg">
                                  {item.product.title}
                                </h3>
                              </Link>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="inline-block px-2.5 py-1 bg-gradient-to-r from-primary-50 to-emerald-50 text-green-700 text-xs font-medium rounded-full">
                                  {item.product.category.name}
                                </span>
                                <span className="text-xs text-gray-400">•</span>
                                <span className="text-xs text-gray-500">
                                  Brand: {item.product.brand.name}
                                </span>
                              </div>
                            </div>

                            <div className="mb-4">
                              <div className="flex items-baseline gap-2">
                                <span className="text-green-600 font-bold text-lg">
                                  {item.price} EGP
                                </span>
                                <span className="text-xs text-gray-400">
                                  per unit
                                </span>
                              </div>
                            </div>

                            <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                              <div className="flex items-center">
                                <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-200">
                                  <button
                                    onClick={() =>
                                      handleUpdateCart(
                                        item.product._id,
                                        item.count - 1,
                                      )
                                    }
                                    disabled={!!currentlyProcessing}
                                    className="h-8 cursor-pointer w-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all disabled:opacity-50"
                                  >
                                    -
                                  </button>
                                  <span className="w-12 text-center font-bold text-gray-900">
                                    {item.count}
                                  </span>
                                  <button
                                    onClick={() =>
                                      handleUpdateCart(
                                        item.product._id,
                                        item.count + 1,
                                      )
                                    }
                                    disabled={!!currentlyProcessing}
                                    className="h-8 w-8 cursor-pointer rounded-lg bg-green-600 flex items-center justify-center text-white transition-all disabled:opacity-50"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="text-right">
                                  <p className="text-xs text-gray-400 mb-0.5">
                                    Total
                                  </p>
                                  <p className="text-xl font-bold text-gray-900">
                                    {item.price * item.count}{" "}
                                    <span className="text-sm font-medium text-gray-400">
                                      EGP
                                    </span>
                                  </p>
                                </div>
                                <button
                                  title="delete"
                                  onClick={() =>
                                    confirmDelete(
                                      item.product._id,
                                      item.product.title,
                                    )
                                  }
                                  disabled={!!currentlyProcessing}
                                  className="h-10 w-10 rounded-xl border border-red-200 bg-red-50 text-red-500 hover:bg-red-600 hover:text-white transition-all flex items-center justify-center disabled:opacity-50"
                                >
                                  <svg
                                    className="h-[1em]"
                                    viewBox="0 0 448 512"
                                    fill="currentColor"
                                  >
                                    <path d="M136.7 5.9L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-8.7-26.1C306.9-7.2 294.7-16 280.9-16L167.1-16c-13.8 0-26 8.8-30.4 21.9zM416 144L32 144 53.1 467.1C54.7 492.4 75.7 512 101 512L347 512c25.3 0 46.3-19.6 47.9-44.9L416 144z" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
                  <Link
                    className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center gap-2"
                    href="/"
                  >
                    <span>←</span> Continue Shopping
                  </Link>

                  <button
                    onClick={confirmClearCart}
                    disabled={!!currentlyProcessing}
                    className="cursor-pointer group flex items-center gap-2 text-sm text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                  >
                    <svg
                      data-prefix="fas"
                      data-icon="trash"
                      className="h-[1em] svg-inline--fa fa-trash text-xs group-hover:scale-110 transition-transform"
                      role="img"
                      viewBox="0 0 448 512"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M136.7 5.9L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-8.7-26.1C306.9-7.2 294.7-16 280.9-16L167.1-16c-13.8 0-26 8.8-30.4 21.9zM416 144L32 144 53.1 467.1C54.7 492.4 75.7 512 101 512L347 512c25.3 0 46.3-19.6 47.9-44.9L416 144z"
                      ></path>
                    </svg>
                    <span>Clear all items</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden sticky top-24 shadow-sm">
                  <div className="bg-green-500 px-6 py-4">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <svg
                        data-prefix="fas"
                        data-icon="bag-shopping"
                        className="h-[1em] svg-inline--fa fa-bag-shopping"
                        role="img"
                        viewBox="0 0 448 512"
                        aria-hidden="true"
                      >
                        <path
                          fill="currentColor"
                          d="M160 80c0-35.3 28.7-64 64-64s64 28.7 64 64l0 48-128 0 0-48zm-48 48l-64 0c-26.5 0-48 21.5-48 48L0 384c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-208c0-26.5-21.5-48-48-48l-64 0 0-48c0-61.9-50.1-112-112-112S112 18.1 112 80l0 48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"
                        ></path>
                      </svg>
                      Order Summary
                    </h2>
                    <p className="text-white text-sm mt-1">
                      {data?.numOfCartItems} items in your cart
                    </p>
                  </div>
                  <div className="p-6 space-y-5">
                    {totalPrice >= 500 ? (
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center">
                          <svg
                            data-prefix="fas"
                            data-icon="truck"
                            className="h-[1em] svg-inline--fa fa-truck text-green-600"
                            role="img"
                            viewBox="0 0 576 512"
                            aria-hidden="true"
                          >
                            <path
                              fill="currentColor"
                              d="M0 96C0 60.7 28.7 32 64 32l288 0c35.3 0 64 28.7 64 64l0 32 50.7 0c17 0 33.3 6.7 45.3 18.7L557.3 192c12 12 18.7 28.3 18.7 45.3L576 384c0 35.3-28.7 64-64 64l-3.3 0c-10.4 36.9-44.4 64-84.7 64s-74.2-27.1-84.7-64l-102.6 0c-10.4 36.9-44.4 64-84.7 64s-74.2-27.1-84.7-64L64 448c-35.3 0-64-28.7-64-64L0 96zM512 288l0-50.7-45.3-45.3-50.7 0 0 96 96 0zM192 424a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm232 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"
                            ></path>
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-green-700">
                            Free Shipping!
                          </p>
                          <p className="text-sm text-green-600">
                            You qualify for free delivery
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div
                        style={{
                          backgroundColor: "#FFF8ED",
                        }}
                        className="bg-[#FFF8ED] rounded-xl p-4"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <svg
                            data-prefix="fas"
                            data-icon="truck"
                            className="h-[1em] svg-inline--fa fa-truck text-orange-500"
                            role="img"
                            viewBox="0 0 576 512"
                            aria-hidden="true"
                          >
                            <path
                              fill="currentColor"
                              d="M0 96C0 60.7 28.7 32 64 32l288 0c35.3 0 64 28.7 64 64l0 32 50.7 0c17 0 33.3 6.7 45.3 18.7L557.3 192c12 12 18.7 28.3 18.7 45.3L576 384c0 35.3-28.7 64-64 64l-3.3 0c-10.4 36.9-44.4 64-84.7 64s-74.2-27.1-84.7-64l-102.6 0c-10.4 36.9-44.4 64-84.7 64s-74.2-27.1-84.7-64L64 448c-35.3 0-64-28.7-64-64L0 96zM512 288l0-50.7-45.3-45.3-50.7 0 0 96 96 0zM192 424a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm232 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"
                            ></path>
                          </svg>

                          <span className="text-sm font-medium text-gray-700">
                            Add {500 - totalPrice} EGP for free shipping
                          </span>
                        </div>

                        <div
                          style={{ backgroundColor: "#FFEDD4" }}
                          className="h-2 rounded-full overflow-hidden"
                        >
                          <div
                            style={{
                              width: `${(totalPrice / 500) * 100}%`,
                              backgroundColor: "orange",
                            }}
                            className="h-full rounded-full transition-all duration-500"
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex mt-4 justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span className="font-medium text-gray-900">
                        {totalPrice} EGP
                      </span>
                    </div>

                    <div className="flex my-4 justify-between text-gray-600">
                      <span>Shipping</span>
                      <span
                        className={`font-medium ${isFreeShipping ? "text-green-600" : "text-gray-900"}`}
                      >
                        {isFreeShipping ? "FREE" : `${shippingFees} EGP`}
                      </span>
                    </div>

                    <div className="border-t py-4 border-dashed border-gray-200 mt-3">
                      <div className="flex justify-between items-baseline">
                        <span className="text-gray-900 font-semibold">
                          Total
                        </span>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-gray-900">
                            {totalPrice + (isFreeShipping ? 0 : shippingFees)}
                          </span>
                          <span className="text-sm text-gray-500 ml-1">
                            EGP
                          </span>
                        </div>
                      </div>
                    </div>

                    <button className="w-full mb-4 cursor-pointer flex items-center justify-center gap-2 py-3 border border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-green-600 hover:text-green-600 hover:bg-green-50/50 transition-all">
                      <svg
                        data-prefix="fas"
                        data-icon="tag"
                        className="h-[1em] svg-inline--fa fa-tag"
                        role="img"
                        viewBox="0 0 512 512"
                        aria-hidden="true"
                      >
                        <path
                          fill="currentColor"
                          d="M32.5 96l0 149.5c0 17 6.7 33.3 18.7 45.3l192 192c25 25 65.5 25 90.5 0L483.2 333.3c25-25 25-65.5 0-90.5l-192-192C279.2 38.7 263 32 246 32L96.5 32c-35.3 0-64 28.7-64 64zm112 16a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
                        ></path>
                      </svg>
                      <span className="text-sm font-medium">
                        Apply Promo Code
                      </span>
                    </button>
                    <Link
                      className="w-full bg-green-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-green-700 transition-all flex items-center justify-center gap-3 shadow-lg"
                      href={`/checkout/${data?.cartId}`}
                    >
                      <svg
                        className="h-[1em]"
                        viewBox="0 0 384 512"
                        fill="currentColor"
                      >
                        <path d="M128 96l0 64 128 0 0-64c0-35.3-28.7-64-64-64s-64 28.7-64 64zM64 160l0-64C64 25.3 121.3-32 192-32S320 25.3 320 96l0 64c35.3 0 64 28.7 64 64l0 224c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 224c0-35.3 28.7-64 64-64z"></path>
                      </svg>
                      Secure Checkout
                    </Link>

                    <div className="flex items-center mt-4 justify-center gap-4 py-2">
                      <Link href={'/checkout'} className="flex items-center gap-1.5 text-xs text-gray-500">
                        <svg
                          data-prefix="fas"
                          data-icon="shield-halved"
                          className="h-[1em] svg-inline--fa fa-shield-halved text-green-500"
                          role="img"
                          viewBox="0 0 512 512"
                          aria-hidden="true"
                        >
                          <path
                            fill="currentColor"
                            d="M256 0c4.6 0 9.2 1 13.4 2.9L457.8 82.8c22 9.3 38.4 31 38.3 57.2-.5 99.2-41.3 280.7-213.6 363.2-16.7 8-36.1 8-52.8 0-172.4-82.5-213.1-264-213.6-363.2-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.9 1 251.4 0 256 0zm0 66.8l0 378.1c138-66.8 175.1-214.8 176-303.4l-176-74.6 0 0z"
                          />
                        </svg>
                        <span>Secure Payment</span>
                      </Link>
                      <div className="w-px h-4 bg-gray-200" />
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <svg
                          data-prefix="fas"
                          data-icon="truck"
                          className="h-[1em] svg-inline--fa fa-truck text-blue-500"
                          role="img"
                          viewBox="0 0 576 512"
                          aria-hidden="true"
                        >
                          <path
                            fill="currentColor"
                            d="M0 96C0 60.7 28.7 32 64 32l288 0c35.3 0 64 28.7 64 64l0 32 50.7 0c17 0 33.3 6.7 45.3 18.7L557.3 192c12 12 18.7 28.3 18.7 45.3L576 384c0 35.3-28.7 64-64 64l-3.3 0c-10.4 36.9-44.4 64-84.7 64s-74.2-27.1-84.7-64l-102.6 0c-10.4 36.9-44.4 64-84.7 64s-74.2-27.1-84.7-64L64 448c-35.3 0-64-28.7-64-64L0 96zM512 288l0-50.7-45.3-45.3-50.7 0 0 96 96 0zM192 424a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm232 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"
                          />
                        </svg>
                        <span>Fast Delivery</span>
                      </div>
                    </div>

                    <Link
                      className="block text-center text-green-600 hover:text-green-700 text-sm font-medium py-2"
                      href="/"
                    >
                      ← Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="max-w-md text-center">
            <div className="relative mb-8">
              <div className="w-32 h-32 rounded-full bg-linear-to-br from-gray-100 to-gray-50 flex items-center justify-center mx-auto">
                <svg
                  data-prefix="fas"
                  data-icon="box-open"
                  className="h-[1em] svg-inline--fa fa-box-open text-5xl text-gray-300"
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
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-gray-100 rounded-full blur-md" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              {`Looks like you haven't added anything to your cart yet.`} <br />
              Start exploring our products!
            </p>
            <Link
              className="inline-flex items-center gap-2 bg-green-600 text-white py-3.5 px-8 rounded-xl font-semibold hover:bg-green-700 transition-all shadow-lg shadow-green-600/20 active:scale-[0.98]"
              href="/"
            >
              Start Shopping
              <svg
                data-prefix="fas"
                data-icon="arrow-right"
                className="h-[1em] svg-inline--fa fa-arrow-right text-sm"
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
        </div>
      )}
    </>
  );
}
