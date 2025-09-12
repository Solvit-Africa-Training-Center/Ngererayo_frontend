export interface Product {
  id: string;
  name: string;
  image: string;
  category: string;
  farmer: string;
  price: string;
  rating: number;
  reviews: number;
  location: string;
  description: string;
  seller: {
    name: string;
    rating: number;
    reviews: number;
  };
  reviewsList: {
    user: string;
    comment: string;
    date: string;
  }[];
}


export interface Testimonial {
  id: number;
  name: string;
  role: string;
  comment: string;
  rating: number;
  avatar?: string;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  productCount: number;
}

export interface Farmer {
  id: number;
  name: string;
  location: string;
  rating: number;
  products: string[];
  image: string;
}

export interface StatItem {
  value: string;
  label: string;
}