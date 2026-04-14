import { productInterface } from "./../../../interfaces/product.interface";
import Link from "next/link";
import { FaPlus, FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import Image from "next/image";
import BottonCom from "../BottoneCom.tsx/BottonCom";
import WishlistButtonCom from "../wishlist_Button_Com/wishlistButtonCom";

interface pageProps {
  product: productInterface;
}

export default async function ProductItem({ product }: pageProps) {
  return (
    <div className="bg-white hover:shadow-xl duration-300 hover:-translate-y-2 border border-gray-200 rounded-lg overflow-hidden">
      <div className="relative">
        <Link href={`/productDeteails/${product._id}`}>
          <Image
            width={300}
            height={300}
            className="w-full h-60 object-contain bg-white"
            src={product.imageCover}
            alt={product.title}
          />
        </Link>
        <div className="absolute top-3 right-3 flex flex-col space-y-2">
          {/* الأزرار الجانبية */}
          <WishlistButtonCom id={product._id}/>

          <button className="bg-white h-8 w-8 hover:text-green-600 rounded-full flex items-center justify-center text-gray-600 shadow-sm">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 512 512">
              <path d="M65.9 228.5c13.3-93 93.4-164.5 190.1-164.5 53 0 101 21.5 135.8 56.2 .2 .2 .4 .4 .6 .6l7.6 7.2-47.9 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-128c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 53.4-11.3-10.7C390.5 28.6 326.5 0 256 0 127 0 20.3 95.4 2.6 219.5 .1 237 12.2 253.2 29.7 255.7s33.7-9.7 36.2-27.1zm443.5 64c2.5-17.5-9.7-33.7-27.1-36.2s-33.7 9.7-36.2 27.1c-13.3 93-93.4 164.5-190.1 164.5-53 0-101-21.5-135.8-56.2-.2-.2-.4-.4-.6-.6l-7.6-7.2 47.9 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 320c-8.5 0-16.7 3.4-22.7 9.5S-.1 343.7 0 352.3l1 127c.1 17.7 14.6 31.9 32.3 31.7S65.2 496.4 65 478.7l-.4-51.5 10.7 10.1c46.3 46.1 110.2 74.7 180.7 74.7 129 0 235.7-95.4 253.4-219.5z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="text-xs text-gray-500 mb-1">
          {product.category.name}
        </div>
        <h3 className="font-medium mb-1 cursor-pointer">
          <Link
            className="line-clamp-2"
            href={`/productDeteails/${product._id}`}
          >
            {product.title.split(" ").slice(0, 2).join(" ")}
          </Link>
        </h3>

        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400 mr-2">
            {[1, 2, 3, 4, 5].map((star) =>
              product.ratingsAverage >= star ? (
                <FaStar key={star} />
              ) : product.ratingsAverage >= star - 0.5 ? (
                <FaStarHalfAlt key={star} />
              ) : (
                <FaRegStar key={star} />
              ),
            )}
          </div>
          <span className="text-xs text-gray-500">
            {product.ratingsAverage} ({product.ratingsQuantity})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            {product.priceAfterDiscount ? (
              <div>
                <span className="text-lg text-green-600 font-bold">
                  {product.priceAfterDiscount} EGP
                </span>
                <span className="text-sm line-through font-bold text-gray-500 mx-2">
                  {product.price} EGP
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-gray-800">
                {product.price} EGP
              </span>
            )}
          </div>

          <BottonCom
            id={product._id}
            cls="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition"
          >
            <FaPlus size={18} />
          </BottonCom>
        </div>
      </div>
    </div>
  );
}
