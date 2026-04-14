"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { registerSchema, RegisterType } from "../schema/schema.regester";
import { registerAction } from "../action/register.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner"

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter()
const {
  control,
  handleSubmit,
  formState: { errors },
  reset,
} = useForm<RegisterType>({
  resolver: zodResolver(registerSchema),
  defaultValues: {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
    terms: false,
  },
});
  
  const onSubmit = async (data: RegisterType) => {
    setLoading(true)
    try {
      const isSuccessfulRegistration = await registerAction(data);
      if (isSuccessfulRegistration) {
        toast.success('User Created Successfully')
        router.push('/login')
      }
    } catch (error:unknown) {
      toast.error((error as Error).message);
    }
    finally {
      setLoading(false)
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
            <h2 className="text-center text-3xl font-semibold mb-2">
              Create Your Account
            </h2>
            <p className="text-center">
              Start your fresh journey with us today
            </p>
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
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Name*</label>

                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="name"
                      placeholder="Ali"
                      type="text"
                      className={`border rounded-md p-2 form-control focus:outline-none ${
                        errors.name
                          ? "border-red-500 focus:border-red-500"
                          : "focus:border-green-500"
                      }`}
                    />
                  )}
                />

                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email">Email*</label>

                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="email"
                      placeholder="ali@example.com"
                      type="email"
                      autoComplete="email"
                      className={`border rounded-md p-2 form-control focus:outline-none ${
                        errors.email
                          ? "border-red-500 focus:border-red-500"
                          : "focus:border-green-500"
                      }`}
                    />
                  )}
                />

                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2">
                <label htmlFor="password">Password*</label>

                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="password"
                      placeholder="create a strong password"
                      type="password"
                      autoComplete="new-password"
                      className={`border rounded-md p-2 form-control focus:outline-none ${
                        errors.password
                          ? "border-red-500 focus:border-red-500"
                          : "focus:border-green-500"
                      }`}
                    />
                  )}
                />

                {errors.password && (
                  <p className="text-red-500 text-xs">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-2">
                <label htmlFor="rePassword">Confirm Password*</label>

                <Controller
                  name="rePassword"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="rePassword"
                      placeholder="confirm your password"
                      type="password"
                      className={`border rounded-md p-2 form-control focus:outline-none ${
                        errors.rePassword
                          ? "border-red-500 focus:border-red-500"
                          : "focus:border-green-500"
                      }`}
                    />
                  )}
                />

                {errors.rePassword && (
                  <p className="text-red-500 text-xs">
                    {errors.rePassword.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-2">
                <label htmlFor="phone">Phone Number*</label>

                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="phone"
                      placeholder="+1 234 567 8900"
                      type="tel"
                      autoComplete="tel"
                      className={`border rounded-md p-2 form-control focus:outline-none ${
                        errors.phone
                          ? "border-red-500 focus:border-red-500"
                          : "focus:border-green-500"
                      }`}
                    />
                  )}
                />

                {errors.phone && (
                  <p className="text-red-500 text-xs">{errors.phone.message}</p>
                )}
              </div>

              {/* Terms */}
              <div>
                <div className="flex items-center gap-2">
                  <Controller
                    name="terms"
                    control={control}
                    render={({ field }) => {
                      const { value, ...rest } = field;

                      return (
                        <input
                          {...rest}
                          id="terms"
                          type="checkbox"
                          className="size-4"
                          checked={value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                      );
                    }}
                  />

                  <label htmlFor="terms" className="ms-2">
                    I agree to the Terms
                  </label>
                </div>

                {errors.terms && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.terms.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn hover:bg-[#15803D] bg-[#16a34a] flex justify-center py-3 items-center rounded-xl font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed w-full transition-colors"
              >
                <span>
                  {loading ? <Spinner></Spinner> : "Create My Account"}
                </span>
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
