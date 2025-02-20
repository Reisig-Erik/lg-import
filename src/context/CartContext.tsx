import React, { createContext, useContext, useState } from 'react';
import { products } from '../data/products';

interface CartItem {
  id: number;
  quantity: number;
}

interface CartContextType {
  cartCount: number;
  cartItems: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (productId: number, quantity: number, skipDrawer?: boolean) => void;
  updateCartItem: (productId: number, quantity: number) => void;
  removeCartItem: (productId: number) => void;
  clearCart: () => void;
  getCartTotal: () => { subTotal: number; feeRate: number; total: number };
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const calculateCartCount = (items: CartItem[]) => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(count);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (productId: number, quantity: number, skipDrawer = false) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === productId);
      const newItems = existingItem
        ? prev.map(item =>
            item.id === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        : [...prev, { id: productId, quantity }];
      
      calculateCartCount(newItems);
      return newItems;
    });
    if (!skipDrawer) {
      openCart();
    }
  };

  const updateCartItem = (productId: number, quantity: number) => {
    if (quantity === 0) {
      removeCartItem(productId);
      return;
    }
    setCartItems(prev => {
      const newItems = prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );
      calculateCartCount(newItems);
      return newItems;
    });
  };

  const removeCartItem = (productId: number) => {
    setCartItems(prev => {
      const newItems = prev.filter(item => item.id !== productId);
      calculateCartCount(newItems);
      return newItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setCartCount(0);
  };

  const getCartTotal = () => {
    const feeRate = 150;
    const subTotal = cartItems.reduce((sum, item) => {
      const product = products.find(p => p.id === item.id);
      return sum + (product?.price || 0) * item.quantity;
    }, 0);
    return {
      subTotal,
      feeRate,
      total: subTotal + feeRate
    };
  };

  return (
    <CartContext.Provider value={{
      cartCount,
      cartItems,
      isCartOpen,
      openCart,
      closeCart,
      addToCart,
      updateCartItem,
      removeCartItem,
      clearCart,
      getCartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}