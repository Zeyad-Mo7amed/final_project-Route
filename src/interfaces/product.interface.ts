export interface Root {
  results: number;
  metadata: Metadata;
  data: productInterface[];
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
}

export interface productInterface {
  sold?: number;
  images: string[];
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
  priceAfterDiscount?: number;
  numOfCartItems: number;
  availableColors?: any[];
  reviews?: { rating: number }[];
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface BrandOrCategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface ProductDetails {
  _id: string;
  id: string;
  title: string;
  quantity: number;
  price: number;
  imageCover: string;
  ratingsAverage: number;
  brand: BrandOrCategory;
  category: BrandOrCategory;
  subcategory: Subcategory[];
}

export interface CartItem {
  _id: string;
  count: number;
  price: number;
  product: ProductDetails;
}

export interface CartResponse {
  status: string;
  numOfCartItems: number;
  data: {
    _id: string;
    cartOwner: string;
    products: CartItem[];
    totalCartPrice: number;
  };
}

export interface getdataAllAddressInterface {
  city: string;
  details: string;
  name: string;
  phone: string;
  _id: string;
}

export interface SubCategoryResponse {
  data: {
    _id: string;
    name: string;
    slug: string;
    category: string;
  }[]; 
  results?: number;
  status?: string;
}

export interface CategoryResponse {
    results: number;
    metadata: Metadata;
    data: CategoryData[];
}

export interface Metadata {
    currentPage: number;
    numberOfPages: number;
    limit: number;
}

export interface CategoryData {
    _id: string;
    name: string;
}