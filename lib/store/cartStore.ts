import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/data/products";

export interface CartItem extends Product {
    quantity: number;
    selectedSize: string;
}

interface CartStore {
    items: CartItem[];
    addItem: (product: Product, size: string) => void;
    removeItem: (id: string, size: string) => void;
    updateQuantity: (id: string, size: string, quantity: number) => void;
    clearCart: () => void;
    getTotal: () => number;
    getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (product, size) =>
                set((state) => {
                    const existingItem = state.items.find(
                        (item) => item.id === product.id && item.selectedSize === size
                    );

                    if (existingItem) {
                        return {
                            items: state.items.map((item) =>
                                item.id === product.id && item.selectedSize === size
                                    ? { ...item, quantity: item.quantity + 1 }
                                    : item
                            ),
                        };
                    }

                    return {
                        items: [...state.items, { ...product, quantity: 1, selectedSize: size }],
                    };
                }),

            removeItem: (id, size) =>
                set((state) => ({
                    items: state.items.filter(
                        (item) => !(item.id === id && item.selectedSize === size)
                    ),
                })),

            updateQuantity: (id, size, quantity) =>
                set((state) => ({
                    items: state.items.map((item) =>
                        item.id === id && item.selectedSize === size
                            ? { ...item, quantity: Math.max(0, quantity) }
                            : item
                    ).filter((item) => item.quantity > 0),
                })),

            clearCart: () => set({ items: [] }),

            getTotal: () => {
                const { items } = get();
                return items.reduce((total, item) => total + item.price * item.quantity, 0);
            },

            getItemCount: () => {
                const { items } = get();
                return items.reduce((count, item) => count + item.quantity, 0);
            },
        }),
        {
            name: "adire-cart-storage",
        }
    )
);
