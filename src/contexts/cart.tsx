import { createContext, useContext, useState } from "react";

export interface CartItem {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: CartItem) => void;
  // updateQuantity: (productId: string, quantity: number) => void;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  // updateQuantity: () => {},
});

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return;
        // prevItems.map((item) =>
        //   item.id === product.id
        //     ? { ...item, quantity: item.quantity + 1 }
        //     : item
        // );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // const updateQuantity = (productId: string, quantity: number) => {
  //   setCartItems((prevItems) =>
  //     prevItems.map((item) =>
  //       item.id === productId ? { ...item, quantity } : item
  //     )
  //   );
  // };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
