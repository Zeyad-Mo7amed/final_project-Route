"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { onlinePayment } from "@/api/pyment/chickout.api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import { CartItem } from "@/interfaces/product.interface";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cashPayment } from "@/api/pyment/cachOrder.api";
const checkoutSchema = z.object({
  city: z.string().min(1, "City is required"),
  details: z.string().min(5, "Address is too short"),
  phone: z.string().regex(/^01[0-2,5]{1}[0-9]{8}$/, "Invalid Egyptian phone"),
});

export default function CheckOut({ id }: { id: string }) {
  const [payment, setPayment] = useState("cash");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await fetch("/api/cart");
      if (!response.ok) throw new Error("Failed to fetch cart data");
      return response.json();
    },
  });

  console.log("data", data);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (data: z.infer<typeof checkoutSchema>) => {
    setIsSubmitting(true);
    try {
      const shippingAddress = {
        city: data.city,
        details: data.details,
        phone: data.phone,
      };
if (payment === "online") {
  const res = await onlinePayment(id, shippingAddress);
  toast.success("Redirecting to payment gateway...");
  window.location.href = res.session.url;
} else {
  try {
    await cashPayment(id, shippingAddress);
    await queryClient.invalidateQueries({ queryKey: ["cart"] });
    toast.success("Order placed successfully! Cash on delivery selected.");
    router.push("/allorders");
  } catch (error) {
    toast.error("Something went wrong with the cash order.");
  }
}
    } catch (error: any) {
      toast.error(error.message || "Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCompleteOrder = () => {
    console.log("Complete order clicked");
  };

  if (payment === "cash") {
  } else {
  }

  if (isLoading) {
    return <Loading />;
  }

  const totalPrice = data?.data?.totalCartPrice || 0;
  const freeShippingLimit = 500;
  const isFreeShipping = totalPrice >= freeShippingLimit;
  const remainingForFreeShipping = Math.max(freeShippingLimit - totalPrice, 0);
  const shippingProgress = Math.min(
    (totalPrice / freeShippingLimit) * 100,
    100,
  );
  const shippingFees = isFreeShipping ? 0 : 50;
  const finalPrice = totalPrice + (isFreeShipping ? 0 : shippingFees);
  return (
    <>
      <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <Link className="hover:text-primary-600 transition" href="/">
                Home
              </Link>
              <span className="text-gray-300">/</span>
              <Link className="hover:text-primary-600 transition" href="/cart">
                Cart
              </Link>
              <span className="text-gray-300">/</span>
              <span className="text-gray-900 font-medium">Checkout</span>
            </nav>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <span className="bg-gradient-to-br from-[#4ade80] via-[#22c55e] to-[#16a34a] text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-green-600/20">
                    <svg
                      data-prefix="fas"
                      data-icon="receipt"
                      className="h-[1em] svg-inline--fa fa-receipt"
                      role="img"
                      viewBox="0 0 384 512"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M14 2.2C22.5-1.7 32.5-.3 39.6 5.8L80 40.4 120.4 5.8c9-7.7 22.3-7.7 31.2 0L192 40.4 232.4 5.8c9-7.7 22.2-7.7 31.2 0L304 40.4 344.4 5.8c7.1-6.1 17.1-7.5 25.6-3.6S384 14.6 384 24l0 464c0 9.4-5.5 17.9-14 21.8s-18.5 2.5-25.6-3.6l-40.4-34.6-40.4 34.6c-9 7.7-22.2 7.7-31.2 0l-40.4-34.6-40.4 34.6c-9 7.7-22.3 7.7-31.2 0L80 471.6 39.6 506.2c-7.1 6.1-17.1 7.5-25.6 3.6S0 497.4 0 488L0 24C0 14.6 5.5 6.1 14 2.2zM104 136c-13.3 0-24 10.7-24 24s10.7 24 24 24l176 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-176 0zM80 352c0 13.3 10.7 24 24 24l176 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-176 0c-13.3 0-24 10.7-24 24zm24-120c-13.3 0-24 10.7-24 24s10.7 24 24 24l176 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-176 0z"
                      />
                    </svg>
                  </span>
                  Complete Your Order
                </h1>
                <p className="text-gray-500 mt-2">
                  Review your items and complete your purchase
                </p>
              </div>
              <Link
                className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary-50 transition-all"
                href="/cart"
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
                Back to Cart
              </Link>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                  <div className="bg-gradient-to-br from-[#16a34a] via-[#22c55e] to-[#16a34a] px-6 py-4">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <svg
                        data-prefix="fas"
                        data-icon="house"
                        className="h-[1em] svg-inline--fa fa-house"
                        role="img"
                        viewBox="0 0 512 512"
                        aria-hidden="true"
                      >
                        <path
                          fill="currentColor"
                          d="M277.8 8.6c-12.3-11.4-31.3-11.4-43.5 0l-224 208c-9.6 9-12.8 22.9-8 35.1S18.8 272 32 272l16 0 0 176c0 35.3 28.7 64 64 64l288 0c35.3 0 64-28.7 64-64l0-176 16 0c13.2 0 25-8.1 29.8-20.3s1.6-26.2-8-35.1l-224-208zM240 320l32 0c26.5 0 48 21.5 48 48l0 96-128 0 0-96c0-26.5 21.5-48 48-48z"
                        />
                      </svg>
                      Shipping Address
                    </h2>
                    <p className="text-primary-100 text-sm mt-1">
                      Where should we deliver your order?
                    </p>
                  </div>
                  <div className="p-6 space-y-5">
                    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                        <svg
                          data-prefix="fas"
                          data-icon="circle-info"
                          className="h-[1em] svg-inline--fa fa-circle-info text-blue-600 text-sm"
                          role="img"
                          viewBox="0 0 512 512"
                          aria-hidden="true"
                        >
                          <path
                            fill="currentColor"
                            d="M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM224 160a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm-8 64l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-blue-800 font-medium">
                          Delivery Information
                        </p>
                        <p className="text-xs text-blue-600 mt-0.5">
                          Please ensure your address is accurate for smooth
                          delivery
                        </p>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        City <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                          <svg
                            data-prefix="fas"
                            data-icon="city"
                            className="h-[1em] svg-inline--fa fa-city text-gray-500 text-sm"
                            role="img"
                            viewBox="0 0 576 512"
                            aria-hidden="true"
                          >
                            <path
                              fill="currentColor"
                              d="M320 0c-35.3 0-64 28.7-64 64l0 32-48 0 0-72c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 72-64 0 0-72C96 10.7 85.3 0 72 0S48 10.7 48 24l0 74c-27.6 7.1-48 32.2-48 62L0 448c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-192c0-35.3-28.7-64-64-64l-64 0 0-128c0-35.3-28.7-64-64-64L320 0zm64 112l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16zm-16 80c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0zm16 112l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16zm112-16c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0zM256 304l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16zM240 192c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0zM128 304l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16zM112 192c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0z"
                            />
                          </svg>
                        </div>
                        <Controller
                          name="city"
                          control={control}
                          render={({ field }) => (
                            <input
                              {...field}
                              className="w-full px-4 py-3.5 border-2 rounded-xl"
                              placeholder="Cairo"
                            />
                          )}
                        />
                        {errors.city && (
                          <p className="text-red-500 text-xs">
                            {errors.city.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="details"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Street Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-4 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                          <svg
                            data-prefix="fas"
                            data-icon="location-dot"
                            className="h-[1em] svg-inline--fa fa-location-dot text-gray-500 text-sm"
                            role="img"
                            viewBox="0 0 384 512"
                            aria-hidden="true"
                          >
                            <path
                              fill="currentColor"
                              d="M0 188.6C0 84.4 86 0 192 0S384 84.4 384 188.6c0 119.3-120.2 262.3-170.4 316.8-11.8 12.8-31.5 12.8-43.3 0-50.2-54.5-170.4-197.5-170.4-316.8zM192 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128z"
                            />
                          </svg>
                        </div>
                        <Controller
                          name="details"
                          control={control}
                          render={({ field }) => (
                            <textarea
                              {...field}
                              className="w-full px-4 py-3.5 border-2 rounded-xl"
                              placeholder="Street..."
                            />
                          )}
                        />
                        {errors.details && (
                          <p className="text-red-500 text-xs">
                            {errors.details.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                          <svg
                            data-prefix="fas"
                            data-icon="phone"
                            className="h-[1em] svg-inline--fa fa-phone text-gray-500 text-sm"
                            role="img"
                            viewBox="0 0 512 512"
                            aria-hidden="true"
                          >
                            <path
                              fill="currentColor"
                              d="M160.2 25C152.3 6.1 131.7-3.9 112.1 1.4l-5.5 1.5c-64.6 17.6-119.8 80.2-103.7 156.4 37.1 175 174.8 312.7 349.8 349.8 76.3 16.2 138.8-39.1 156.4-103.7l1.5-5.5c5.4-19.7-4.7-40.3-23.5-48.1l-97.3-40.5c-16.5-6.9-35.6-2.1-47 11.8l-38.6 47.2C233.9 335.4 177.3 277 144.8 205.3L189 169.3c13.9-11.3 18.6-30.4 11.8-47L160.2 25z"
                            />
                          </svg>
                        </div>
                        <Controller
                          name="phone"
                          control={control}
                          render={({ field }) => (
                            <input
                              {...field}
                              className="w-full px-4 py-3.5 border-2 rounded-xl"
                              placeholder="01xxxxxxxxx"
                            />
                          )}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-xs">
                            {errors.phone.message}
                          </p>
                        )}
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                          Egyptian numbers only
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                  <div className="bg-gradient-to-br from-[#16a34a] via-[#22c55e] to-[#16a34a] px-6 py-4">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <svg
                        data-prefix="fas"
                        data-icon="wallet"
                        className="h-[1em] svg-inline--fa fa-wallet"
                        role="img"
                        viewBox="0 0 512 512"
                        aria-hidden="true"
                      >
                        <path
                          fill="currentColor"
                          d="M64 32C28.7 32 0 60.7 0 96L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-192c0-35.3-28.7-64-64-64L72 128c-13.3 0-24-10.7-24-24S58.7 80 72 80l384 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L64 32zM416 256a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
                        />
                      </svg>
                      Payment Method
                    </h2>
                    <p className="text-primary-100 text-sm mt-1">
                      {`Choose how you'd like to pay`}
                    </p>
                  </div>
                  <div className="p-6 space-y-4">
                    <button
                      type="button"
                      onClick={() => setPayment("cash")}
                      className={`w-full cursor-pointer px-5 py-5 rounded-xl border-2 transition-all flex items-center gap-4
              ${
                payment === "cash"
                  ? "border-green-500 bg-[#ECFDF5]"
                  : "border-gray-200"
              }`}
                    >
                      {/* Left Icon */}
                      <div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all
                ${payment === "cash" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-400"}`}
                      >
                        💵
                      </div>

                      {/* Text */}
                      <div className="flex-1 text-left">
                        <h3
                          className={`font-bold ${payment === "cash" ? "text-green-700" : "text-gray-900"}`}
                        >
                          Cash on Delivery
                        </h3>
                        <p className="text-sm text-gray-500">
                          Pay when your order arrives
                        </p>
                      </div>

                      <div
                        style={{ width: "28px", height: "28px" }}
                        className={`w-7 h-7 rounded-full flex items-center justify-center border-2
                ${
                  payment === "cash"
                    ? "bg-green-500 border-green-500 text-white"
                    : "border-gray-400"
                }`}
                      >
                        {payment === "cash" && "✓"}
                      </div>
                    </button>

                    {/* Online - الدفع أونلاين */}
                    <button
                      type="button"
                      onClick={() => setPayment("online")}
                      className={`w-full cursor-pointer px-5 py-5 rounded-xl border-2 transition-all flex items-center gap-4
              ${
                payment === "online"
                  ? "border-green-500 bg-[#ECFDF5]"
                  : "border-gray-200"
              }`}
                    >
                      {/* Left Icon */}
                      <div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all
                ${payment === "online" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-400"}`}
                      >
                        💳
                      </div>

                      {/* Text */}
                      <div className="flex-1 text-left">
                        <h3
                          className={`font-bold ${payment === "online" ? "text-green-700" : "text-gray-900"}`}
                        >
                          Pay Online
                        </h3>
                        <p className="text-sm text-gray-500">
                          Credit / Debit Card
                        </p>

                        <div className="flex gap-2 mt-2">
                          <Image
                            width={20}
                            height={20}
                            alt="visa"
                            src="https://img.icons8.com/color/48/visa.png"
                          />
                          <Image
                            width={20}
                            height={20}
                            alt="mastercard"
                            src="https://img.icons8.com/color/48/mastercard.png"
                          />
                        </div>
                      </div>

                      {/* Right Circle */}
                      <div
                        style={{ width: "28px", height: "28px" }}
                        className={`w-7 h-7 rounded-full flex items-center justify-center border-2
                ${
                  payment === "online"
                    ? "bg-green-500 border-green-500 text-white"
                    : "border-gray-400"
                }`}
                      >
                        {payment === "online" && "✓"}
                      </div>
                    </button>

                    {/* زرار إتمام العملية اللي بيستخدم الـ ID اللي باعتينه */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl mt-4 transition-colors shadow-md disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <Spinner />
                      ) : (
                        `Complete Order for ${finalPrice} EGP`
                      )}
                    </button>
                    <div className="flex items-center gap-3 p-4 bg-green-200 rounded-xl border border-green-100 mt-4">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                        <svg
                          data-prefix="fas"
                          data-icon="shield-halved"
                          className="h-[1em] svg-inline--fa fa-shield-halved text-green-600"
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
                        <p className="text-sm font-medium text-green-800">
                          Secure &amp; Encrypted
                        </p>
                        <p className="text-xs text-green-600 mt-0.5">
                          Your payment info is protected with 256-bit SSL
                          encryption
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm sticky top-4">
                  <div className="bg-gradient-to-br from-[#16a34a] via-[#22c55e] to-[#16a34a] px-6 py-4">
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
                        />
                      </svg>
                      Order Summary
                    </h2>
                    <p className="text-white text-sm mt-1">
                      {data?.numOfCartItems}
                      <span> items</span>
                    </p>
                  </div>
                  <div className="px-5 py-5">
                    <div
                      style={{ maxHeight: "167px" }}
                      className="space-y-3 max-h-56 overflow-y-auto mb-5 pr-1"
                    >
                      {data?.data.products.map((product: CartItem) => {
                        return (
                          <div
                            key={product._id}
                            className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                          >
                            <div className="w-14 h-14 rounded-lg bg-white p-1 border border-gray-100 shrink-0">
                              <Image
                                width={100}
                                height={100}
                                alt={product?.product?.title}
                                className="w-full h-full object-contain"
                                src={product?.product?.imageCover}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {product?.product?.title}
                              </p>
                              <p className="text-xs text-gray-500 mt-0.5">
                                {`${product.count}× ${product?.price} EGP`}
                              </p>
                            </div>
                            <p className="text-sm font-bold text-gray-900 shrink-0">
                              {product.count * product?.price} EGP
                            </p>
                          </div>
                        );
                      })}
                    </div>
                    <hr className="border-gray-100 my-4" />
                    <div className="space-y-3">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span className="font-medium">
                          {data.data.totalCartPrice}
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span className="flex items-center gap-2">
                          <svg
                            data-prefix="fas"
                            data-icon="truck"
                            className="h-[1em] svg-inline--fa fa-truck text-gray-400"
                            role="img"
                            viewBox="0 0 576 512"
                            aria-hidden="true"
                          >
                            <path
                              fill="currentColor"
                              d="M0 96C0 60.7 28.7 32 64 32l288 0c35.3 0 64 28.7 64 64l0 32 50.7 0c17 0 33.3 6.7 45.3 18.7L557.3 192c12 12 18.7 28.3 18.7 45.3L576 384c0 35.3-28.7 64-64 64l-3.3 0c-10.4 36.9-44.4 64-84.7 64s-74.2-27.1-84.7-64l-102.6 0c-10.4 36.9-44.4 64-84.7 64s-74.2-27.1-84.7-64L64 448c-35.3 0-64-28.7-64-64L0 96zM512 288l0-50.7-45.3-45.3-50.7 0 0 96 96 0zM192 424a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm232 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"
                            />
                          </svg>
                          Shipping
                        </span>
                        <span
                          className={`font-medium ${isFreeShipping ? "text-green-600" : "text-gray-900"}`}
                        >
                          {isFreeShipping ? "FREE" : `${shippingFees} EGP`}
                        </span>
                      </div>
                      <hr className="border-gray-100" />
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900">
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
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full my-6 cursor-pointer bg-gradient-to-br from-[#16a34a] via-[#22c55e] to-[#16a34a] text-white py-4 rounded-xl font-bold hover:bg-green-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-primary-600/20 active:scale-[0.98]"
                    >
                      <svg
                        data-prefix="fas"
                        data-icon="box"
                        className="h-[1em] svg-inline--fa fa-box"
                        role="img"
                        viewBox="0 0 448 512"
                        aria-hidden="true"
                      >
                        <path
                          fill="currentColor"
                          d="M369.4 128l-34.3-48-222.1 0-34.3 48 290.7 0zM0 148.5c0-13.3 4.2-26.3 11.9-37.2L60.9 42.8C72.9 26 92.3 16 112.9 16l222.1 0c20.7 0 40.1 10 52.1 26.8l48.9 68.5c7.8 10.9 11.9 23.9 11.9 37.2L448 416c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 148.5z"
                        />
                      </svg>
                      {isSubmitting ? <Spinner /> : "Place Order"}
                    </button>
                    <div className="flex items-center justify-center gap-4 mt-4 py-3 border-t border-gray-100">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
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
                        <span>Secure</span>
                      </div>
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
                      <div className="w-px h-4 bg-gray-200" />
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <svg
                          data-prefix="fas"
                          data-icon="box"
                          className="h-[1em] svg-inline--fa fa-box text-orange-500"
                          role="img"
                          viewBox="0 0 448 512"
                          aria-hidden="true"
                        >
                          <path
                            fill="currentColor"
                            d="M369.4 128l-34.3-48-222.1 0-34.3 48 290.7 0zM0 148.5c0-13.3 4.2-26.3 11.9-37.2L60.9 42.8C72.9 26 92.3 16 112.9 16l222.1 0c20.7 0 40.1 10 52.1 26.8l48.9 68.5c7.8 10.9 11.9 23.9 11.9 37.2L448 416c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 148.5z"
                          />
                        </svg>
                        <span>Easy Returns</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
