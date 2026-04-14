"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { loginSchema, LoginType } from "../schema/schema.login";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginType) => {
    setLoading(true);
    try {
      const res = await signIn('credentials' , {redirect:false,...data});      
      if (res?.ok) {
        toast.success("Login Successfully");
        router.push("/");
        reset()
      }
    } catch (error: unknown) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="py-10">
        <div className="container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 p-4">
          <div>
            <h1 className="text-4xl font-bold">
              Welcome to <span className="text-green-600">FreshCart</span>
            </h1>
            <p className="text-xl mt-2 mb-4">
              Join thousands of happy customers who enjoy fresh groceries
              delivered right to their doorstep.
            </p>
            <ul className="*:flex *:items-start *:gap-4 space-y-6 my-8">
              <li>
                <div className="icon bg-[#BBF7D0] size-12 text-lg bg-primary-200 text-primary-600 rounded-full flex justify-center items-center">
                  <svg
                    data-prefix="fas"
                    data-icon="star"
                    className="h-[1em] text-[#16A34A] svg-inline--fa fa-star"
                    role="img"
                    viewBox="0 0 576 512"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z"
                    />
                  </svg>
                </div>
                <div className="content">
                  <h2 className="text-lg font-semibold">Premium Quality</h2>
                  <p className="text-gray-600">
                    Premium quality products sourced from trusted suppliers.
                  </p>
                </div>
              </li>
              <li>
                <div className="icon bg-[#BBF7D0] size-12 text-lg bg-primary-200 text-primary-600 rounded-full flex justify-center items-center">
                  <svg
                    data-prefix="fas"
                    data-icon="truck-fast"
                    className="h-[1em] text-[#16A34A] svg-inline--fa fa-truck-fast"
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
                <div className="content">
                  <h2 className="text-lg font-semibold">Fast Delivery</h2>
                  <p className="text-gray-600">
                    Same-day delivery available in most areas
                  </p>
                </div>
              </li>
              <li>
                <div className="icon bg-[#BBF7D0] size-12 text-lg bg-primary-200 text-primary-600 rounded-full flex justify-center items-center">
                  <svg
                    data-prefix="fas"
                    data-icon="shield-halved"
                    className="h-[1em] text-[#16A34A] svg-inline--fa fa-shield-halved"
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
                <div className="content">
                  <h2 className="text-lg font-semibold">Secure Shopping</h2>
                  <p className="text-gray-600">
                    Your data and payments are completely secure
                  </p>
                </div>
              </li>
            </ul>
            <div className="review bg-white shadow-sm p-4 rounded-md">
              <div className="author flex items-center gap-4 mb-4">
                <Image
                  alt="Review author"
                  width={512}
                  height={512}
                  className="size-12 rounded-full"
                  src="/assets/final-project/review-author.webp"
                />
                <div>
                  <h3>Sarah Johnson</h3>
                  <div className="rating flex gap-1 *:text-yellow-300">
                    <svg
                      data-prefix="fas"
                      data-icon="star"
                      className="h-[1em] svg-inline--fa fa-star"
                      role="img"
                      viewBox="0 0 576 512"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z"
                      />
                    </svg>
                    <svg
                      data-prefix="fas"
                      data-icon="star"
                      className="h-[1em] svg-inline--fa fa-star"
                      role="img"
                      viewBox="0 0 576 512"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z"
                      />
                    </svg>
                    <svg
                      data-prefix="fas"
                      data-icon="star"
                      className="h-[1em] svg-inline--fa fa-star"
                      role="img"
                      viewBox="0 0 576 512"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z"
                      />
                    </svg>
                    <svg
                      data-prefix="fas"
                      data-icon="star"
                      className="h-[1em] svg-inline--fa fa-star"
                      role="img"
                      viewBox="0 0 576 512"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z"
                      />
                    </svg>
                    <svg
                      data-prefix="fas"
                      data-icon="star"
                      className="h-[1em] svg-inline--fa fa-star"
                      role="img"
                      viewBox="0 0 576 512"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <blockquote>
                <p className="italic text-gray-600">
                  {`"FreshCart has transformed my shopping experience. The
                  quality of the products is outstanding, and the delivery is
                  always on time. Highly recommend!"`}
                </p>
              </blockquote>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg px-6 py-10">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <span className="text-3xl font-bold  text-green-600">
                  Fresh<span className="text-gray-800 px-1">Cart</span>
                </span>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Welcome Back!
              </h1>
              <p className="text-gray-600">
                Sign in to continue your fresh shopping experience
              </p>
            </div>

            <div className="register-options flex gap-2 *:grow my-10">
              <button
                type="button"
                className="btn p-2 rounded-md bg-transparent border border-gray-300 hover:bg-gray-100 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Sign up with Google"
              >
                <svg
                  data-prefix="fab"
                  data-icon="google"
                  className="h-[1em] svg-inline--fa fa-google me-2 text-red-600"
                  role="img"
                  viewBox="0 0 512 512"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M500 261.8C500 403.3 403.1 504 260 504 122.8 504 12 393.2 12 256S122.8 8 260 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9c-88.3-85.2-252.5-21.2-252.5 118.2 0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9l-140.8 0 0-85.3 236.1 0c2.3 12.7 3.9 24.9 3.9 41.4z"
                  />
                </svg>
                <span>Google</span>
              </button>
              <button
                type="button"
                className="btn p-2 rounded-md bg-transparent border border-gray-300 hover:bg-gray-100 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Sign up with Facebook"
              >
                <svg
                  data-prefix="fab"
                  data-icon="facebook"
                  className="h-[1em] svg-inline--fa fa-facebook me-2 text-blue-600"
                  role="img"
                  viewBox="0 0 512 512"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5l0-170.3-52.8 0 0-78.2 52.8 0 0-33.7c0-87.1 39.4-127.5 125-127.5 16.2 0 44.2 3.2 55.7 6.4l0 70.8c-6-.6-16.5-1-29.6-1-42 0-58.2 15.9-58.2 57.2l0 27.8 83.6 0-14.4 78.2-69.3 0 0 175.9C413.8 494.8 512 386.9 512 256z"
                  />
                </svg>
                <span>Facebook</span>
              </button>
            </div>
            <div
              className="divider relative w-full h-0.5 bg-gray-300/30 my-4 flex items-center before:content-['or'] before:absolute before:top-1/2 before:left-1/2 before:-translate-1/2 before:bg-white before:px-4"
              aria-hidden="true"
            >
              <span className="sr-only">or</span>
            </div>
            <form
              className="space-y-7"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              {/* Email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email">Email Address</label>

                <div className="relative">
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <>
                        <input
                          {...field}
                          className={`w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all ${
                            errors.email
                              ? "border-red-500 focus:border-red-500"
                              : "focus:border-green-500"
                          } `}
                          placeholder="Enter your email"
                          id="email"
                          type="email"
                          name="email"
                        />
                        <svg
                          data-prefix="fas"
                          data-icon="envelope"
                          className={`h-[1em] svg-inline--fa fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 `}
                          role="img"
                          viewBox="0 0 512 512"
                          aria-hidden="true"
                        >
                          <path
                            fill="currentColor"
                            d="M48 64c-26.5 0-48 21.5-48 48 0 15.1 7.1 29.3 19.2 38.4l208 156c17.1 12.8 40.5 12.8 57.6 0l208-156c12.1-9.1 19.2-23.3 19.2-38.4 0-26.5-21.5-48-48-48L48 64zM0 196L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-188-198.4 148.8c-34.1 25.6-81.1 25.6-115.2 0L0 196z"
                          />
                        </svg>
                      </>
                    )}
                  />
                </div>

                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Password
                  </label>
                  <Link
                    className="text-sm text-green-600 hover:text-primary-700 cursor-pointer font-medium"
                    href="/forget-password"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <div className="relative">
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <>
                        <input
                          {...field}
                          id="password"
                          className={`w-full px-4 py-3 pl-12 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all ${
                            errors.password
                              ? "border-red-500 focus:border-red-500"
                              : "focus:border-green-500"
                          }`}
                          placeholder="Enter your password"
                          type="password"
                          name="password"
                        />
                        <svg
                          data-prefix="fas"
                          data-icon="lock"
                          className="h-[1em] svg-inline--fa fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                          role="img"
                          viewBox="0 0 384 512"
                          aria-hidden="true"
                        >
                          <path
                            fill="currentColor"
                            d="M128 96l0 64 128 0 0-64c0-35.3-28.7-64-64-64s-64 28.7-64 64zM64 160l0-64C64 25.3 121.3-32 192-32S320 25.3 320 96l0 64c35.3 0 64 28.7 64 64l0 224c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 224c0-35.3 28.7-64 64-64z"
                          />
                        </svg>
                        <button
                          title="svg-inline"
                          type="button"
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          <svg
                            data-prefix="fas"
                            data-icon="eye"
                            className="svg-inline--fa fa-eye"
                            role="img"
                            viewBox="0 0 576 512"
                            aria-hidden="true"
                          >
                            <path
                              fill="currentColor"
                              d="M288 32c-80.8 0-145.5 36.8-192.6 80.6-46.8 43.5-78.1 95.4-93 131.1-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64-11.5 0-22.3-3-31.7-8.4-1 10.9-.1 22.1 2.9 33.2 13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-12.2-45.7-55.5-74.8-101.1-70.8 5.3 9.3 8.4 20.1 8.4 31.7z"
                            />
                          </svg>
                        </button>
                      </>
                    )}
                  />
                </div>

                {errors.password && (
                  <p className="text-red-500 text-xs">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn hover:bg-[#15803D] bg-[#16a34a] flex justify-center py-3 items-center rounded-xl font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed w-full transition-colors"
              >
                <span>{loading ? <Spinner></Spinner> : "Sign In"}</span>
              </button>
            </form>
            <p className="border-t pt-10 border-gray-300/30 my-4 text-center">
              Already have an account?{" "}
              <Link
                className="text-green-600 hover:underline font-medium"
                href="/login"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
