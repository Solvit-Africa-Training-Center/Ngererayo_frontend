export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  sellerId: string;
  sellerName: string;
  unit: string;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}