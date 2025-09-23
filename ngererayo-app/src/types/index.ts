export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  quantity: number;    // 🔴 required
  image: string;
  rating: number;
  owner: number;       // 🔴 required
  farmer: string;
  reviews?: any;
  location?: string;
  owner_name?: string;
  reviewsList?: any;
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


