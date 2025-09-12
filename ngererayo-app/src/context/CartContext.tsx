import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CartItem } from '../type/cart';
import { api } from '../utilis/api';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  fetchCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Fetch cart items from backend
  const fetchCart = async () => {
    try {
      const res = await api.get('/market/cart/');
      const backendCart: CartItem[] = res.data.map((item: any) => ({
        id: item.product_id.toString(),
        name: item.product.product_name,
        price: parseFloat(item.product.price.replace('RWF ', '').replace(',', '')),
        quantity: item.quantity,
        image: item.product.image || '', // adapt if image exists
        sellerId: item.product.owner_id.toString(),
        sellerName: item.product.owner.farming_name,
        unit: 'piece'
      }));
      setCartItems(backendCart);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (item: Omit<CartItem, 'quantity'>) => {
    try {
      // POST to backend
      await api.post('/market/cart_add/', {
        product_id: item.id,
        quantity: 1
      });

      // Update local state
      setCartItems(prev => {
        const existing = prev.find(cartItem => cartItem.id === item.id);
        if (existing) {
          return prev.map(cartItem =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          );
        }
        return [...prev, { ...item, quantity: 1 }];
      });
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const removeFromCart = async (id: string) => {
    try {
      await api.post('/market/cart_remove/', { product_id: id }); // adapt endpoint if different
      setCartItems(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error('Failed to remove from cart:', error);
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity < 1) return;
    try {
      await api.post('/market/cart_update/', { product_id: id, quantity }); // adapt endpoint if needed
      setCartItems(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  const clearCart = async () => {
    try {
      await api.post('/market/cart_clear/'); // adapt endpoint
      setCartItems([]);
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  const getCartTotal = () => cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const getCartItemCount = () => cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartItemCount,
      fetchCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
