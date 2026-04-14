'use client'
import { useState } from "react";
import Link from "next/link";
import { addAddress } from "@/api/addAddress.api";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { getdataAllAddressInterface } from '@/interfaces/product.interface';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllAddress } from "@/api/getAllAddress.api";
import Loading from "../Loading/Loading";
import { removeAddress } from "@/api/removeAddress.api";
import Sidbar from "../Sidbar/Sidbar";
export default function MyAccount({
  token,
  getdataAllAddress,
}: {
  token: string ;
  getdataAllAddress: getdataAllAddressInterface;
}) {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      details: "",
      phone: "",
      city: "",
    },
  });

  const { data: addressesData, isLoading } = useQuery({
    queryKey: ["addresses"],
    queryFn: () => getAllAddress(token),
  });

  const onSubmit = async (data: getdataAllAddressInterface) => {
    setLoading(true);
    try {
      await addAddress(data, token);
      toast.success("Address Added Successfully ✅");
      setIsOpen(false);
      reset();
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    } catch (error: unknown) {
      toast.error( "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

    const removeAddressMutation = useMutation({
      mutationFn: (id: string) => removeAddress(id),
      onSuccess: () => {
        toast.success("Address Removed Successfully ✅");
        queryClient.invalidateQueries({ queryKey: ["addresses"] });
      },
      onError: (error: unknown) => {
        toast.error("Failed to remove address ❌");
      },
    });

  if (isLoading) return <Loading />;
  return (
    <>
      <div className="min-h-screen bg-gray-50/50">
        <div className="bg-gradient-to-br from-[#4ade80] via-[#16a34a] to-[#22c55e] text-white">
          <div className="container mx-auto px-4 py-10 sm:py-12">
            <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
              <Link
                className="hover:text-white transition-colors duration-200"
                href="/"
              >
                Home
              </Link>
              <span className="text-white/40">/</span>
              <span className="text-white font-medium">My Account</span>
            </nav>
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
                <svg
                  data-prefix="fas"
                  data-icon="user"
                  className="h-[1em] svg-inline--fa fa-user text-3xl"
                  role="img"
                  viewBox="0 0 448 512"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  My Account
                </h1>
                <p className="text-white/80 mt-1">
                  Manage your addresses and account settings
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <Sidbar />
            <main className="flex-1 min-w-0">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      My Addresses
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                      Manage your saved delivery addresses
                    </p>
                  </div>
                  <button
                    onClick={() => setIsOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors shadow-lg shadow-primary-600/25"
                  >
                    <svg
                      data-prefix="fas"
                      data-icon="plus"
                      className="h-[1em] svg-inline--fa fa-plus text-sm"
                      role="img"
                      viewBox="0 0 448 512"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z"
                      />
                    </svg>
                    Add Address
                  </button>
                </div>

                <div className="grid  grid-cols-1 md:grid-cols-2 gap-4">
                  {addressesData?.map((adress: getdataAllAddressInterface) => {
                    return (
                      <div
                        key={adress._id}
                        style={{ padding: "20px" }}
                        className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary-100 transition-all duration-200 group"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="w-11 h-11 p-5 rounded-xl bg-green-50 flex items-center justify-center shrink-0 group-hover:bg-primary-100 transition-colors">
                              <svg
                                data-prefix="fas"
                                data-icon="location-dot"
                                className="h-[1em] svg-inline--fa fa-location-dot text-lg text-green-600"
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
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold  text-gray-900 mb-1">
                                {adress.name}
                              </h3>
                              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                {adress.details}
                              </p>
                              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                <span className="flex items-center gap-1.5">
                                  <svg
                                    data-prefix="fas"
                                    data-icon="phone"
                                    className="h-[1em] svg-inline--fa fa-phone text-xs"
                                    role="img"
                                    viewBox="0 0 512 512"
                                    aria-hidden="true"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M160.2 25C152.3 6.1 131.7-3.9 112.1 1.4l-5.5 1.5c-64.6 17.6-119.8 80.2-103.7 156.4 37.1 175 174.8 312.7 349.8 349.8 76.3 16.2 138.8-39.1 156.4-103.7l1.5-5.5c5.4-19.7-4.7-40.3-23.5-48.1l-97.3-40.5c-16.5-6.9-35.6-2.1-47 11.8l-38.6 47.2C233.9 335.4 177.3 277 144.8 205.3L189 169.3c13.9-11.3 18.6-30.4 11.8-47L160.2 25z"
                                    />
                                  </svg>
                                  {adress.phone}
                                </span>
                                <span className="flex items-center gap-1.5">
                                  <svg
                                    data-prefix="fas"
                                    data-icon="city"
                                    className="h-[1em] svg-inline--fa fa-city text-xs"
                                    role="img"
                                    viewBox="0 0 576 512"
                                    aria-hidden="true"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M320 0c-35.3 0-64 28.7-64 64l0 32-48 0 0-72c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 72-64 0 0-72C96 10.7 85.3 0 72 0S48 10.7 48 24l0 74c-27.6 7.1-48 32.2-48 62L0 448c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-192c0-35.3-28.7-64-64-64l-64 0 0-128c0-35.3-28.7-64-64-64L320 0zm64 112l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16zm-16 80c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0zm16 112l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16zm112-16c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0zM256 304l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16zM240 192c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0zM128 304l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16zM112 192c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0z"
                                    />
                                  </svg>
                                  {adress.city}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setIsOpen(true)}
                              className="w-9 h-9 cursor-pointer rounded-lg bg-gray-100 text-gray-600 hover:bg-green-300 hover:text-green-600 flex items-center justify-center transition-colors"
                              title="Edit address"
                            >
                              <svg
                                data-prefix="fas"
                                data-icon="pen"
                                className="h-[1em] svg-inline--fa fa-pen text-sm"
                                role="img"
                                viewBox="0 0 512 512"
                                aria-hidden="true"
                              >
                                <path
                                  fill="currentColor"
                                  d="M352.9 21.2L308 66.1 445.9 204 490.8 159.1C504.4 145.6 512 127.2 512 108s-7.6-37.6-21.2-51.1L455.1 21.2C441.6 7.6 423.2 0 404 0s-37.6 7.6-51.1 21.2zM274.1 100L58.9 315.1c-10.7 10.7-18.5 24.1-22.6 38.7L.9 481.6c-2.3 8.3 0 17.3 6.2 23.4s15.1 8.5 23.4 6.2l127.8-35.5c14.6-4.1 27.9-11.8 38.7-22.6L412 237.9 274.1 100z"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={() =>
                                removeAddressMutation.mutate(adress._id)
                              }
                              className="w-9 h-9 cursor-pointer rounded-lg bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition-colors disabled:opacity-50"
                              title="Delete address"
                            >
                              <svg
                                data-prefix="fas"
                                data-icon="trash"
                                className="h-[1em] svg-inline--fa fa-trash text-sm"
                                role="img"
                                viewBox="0 0 448 512"
                                aria-hidden="true"
                              >
                                <path
                                  fill="currentColor"
                                  d="M136.7 5.9L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-8.7-26.1C306.9-7.2 294.7-16 280.9-16L167.1-16c-13.8 0-26 8.8-30.4 21.9zM416 144L32 144 53.1 467.1C54.7 492.4 75.7 512 101 512L347 512c25.3 0 46.3-19.6 47.9-44.9L416 144z"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                      <div
                        onClick={() => setIsOpen(false)}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                      >
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="absolute left-1/2 -translate-x-1/2 w-1/3 top-1/2 -translate-y-1/2 m-auto bg-white rounded-3xl shadow-2xl max-w-lg p-6 sm:p-8 animate-in zoom-in-95 duration-200"
                        >
                          <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">
                              Add New Address
                            </h2>
                            <button
                              title="isOpen"
                              onClick={() => setIsOpen(false)}
                              className="w-9 h-9 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center justify-center transition-colors"
                            >
                              <svg
                                data-prefix="fas"
                                data-icon="xmark"
                                className="h-[1em] svg-inline--fa fa-xmark"
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

                          <form
                            onSubmit={handleSubmit(onSubmit as any)}
                            className="space-y-5"
                          >
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Address Name
                              </label>

                              <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                  <input
                                    required
                                    {...field}
                                    placeholder="e.g. Home, Office"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                                    type="text"
                                  />
                                )}
                              />

                              {errors.name && (
                                <p className="text-red-500 text-sm mt-1">
                                  {errors.name.message}
                                </p>
                              )}
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Address
                              </label>

                              <Controller
                                name="details"
                                control={control}
                                render={({ field }) => (
                                  <textarea
                                    required
                                    {...field}
                                    placeholder="Street, building, apartment..."
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all resize-none"
                                  />
                                )}
                              />

                              {errors.details && (
                                <p className="text-red-500 text-sm mt-1">
                                  {errors.details.message}
                                </p>
                              )}
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-5">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Phone Number
                                </label>

                                <Controller
                                  name="phone"
                                  control={control}
                                  render={({ field }) => (
                                    <input
                                      required
                                      {...field}
                                      placeholder="01xxxxxxxxx"
                                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                                      type="tel"
                                    />
                                  )}
                                />

                                {errors.phone && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {errors.phone.message}
                                  </p>
                                )}
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  City
                                </label>

                                <Controller
                                  name="city"
                                  control={control}
                                  render={({ field }) => (
                                    <input
                                      required
                                      {...field}
                                      placeholder="Cairo"
                                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                                      type="text"
                                    />
                                  )}
                                />

                                {errors.city && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {errors.city.message}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="flex mt-5 items-center gap-3 pt-4">
                              <button
                                onClick={() => setIsOpen(false)}
                                type="button"
                                className="flex-1 py-3 px-6 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors"
                              >
                                Cancel
                              </button>

                              <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 py-3 px-6 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 shadow-lg shadow-primary-600/25"
                              >
                                {loading ? "Loading..." : "Add Address"}
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
