import { create } from "zustand";
import { Dish } from "@/types/dish.interface";

interface CartStore {
  cart: Dish[];
  addToCart: (item: Dish) => void;
  removeFromCart: (dish_id: number) => void;
  clearCart: () => void;
  increaseQuantity: (dish_id: number) => void;
  decreaseQuantity: (dish_id: number) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cart: [],

  addToCart: (item) =>
    set((state) => {
      const existing = state.cart.find((i) => i.dish_id === item.dish_id);
      if (existing) {
        return {
          cart: state.cart.map((i) =>
            i.dish_id === item.dish_id
              ? {
                  ...i,
                  quantity: (
                    parseInt(i.quantity) + parseInt(item.quantity)
                  ).toString(),
                }
              : i,
          ),
        };
      } else {
        return { cart: [...state.cart, item] };
      }
    }),

  removeFromCart: (dish_id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.dish_id !== dish_id),
    })),

  clearCart: () => set({ cart: [] }),

  increaseQuantity: (dish_id) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.dish_id === dish_id
          ? {
              ...item,
              quantity: (parseInt(item.quantity) + 1).toString(),
            }
          : item,
      ),
    })),

  decreaseQuantity: (dish_id) =>
    set((state) => ({
      cart: state.cart
        .map((item) =>
          item.dish_id === dish_id
            ? {
                ...item,
                quantity: (parseInt(item.quantity) - 1).toString(),
              }
            : item,
        )
        .filter((item) => parseInt(item.quantity) > 0),
    })),
}));
