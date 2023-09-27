import { Game } from "@prisma/client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartStore {
  items: Game[];
  addItem: (data: Game, toast: (options: { description: string }) => void) => void; // Add type for toast
  removeItem: (id: string, toast: (options: { description: string }) => void) => void; // Add type for toast
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>((set, get) => ({
    items: [],

    addItem: (data: Game, toast) => {
      const currentItems = get().items;
      const existingItem = currentItems.find((item) => item.id === data.id);

      if (existingItem) {
        return toast({ description: "Item already in cart." });
      }

      set({ items: [...get().items, data] });
      toast({ description: "Item added to cart." });
    },

    removeItem: (id: string, toast) => {
      set({ items: [...get().items.filter((item) => item.id !== id)] });
      toast({ description: "Item removed from the cart." });
    },

    removeAll: () => set({ items: [] }),
  }), {
    name: "cart-storage",
    storage: createJSONStorage(() => localStorage),
  })
);

export default useCart;
