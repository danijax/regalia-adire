import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/data/products";

export interface CartItem extends Product {
    quantity: number;
    selectedSize: string;
    selectedColor: string;
}

interface CartStore {
    items: CartItem[];
    addItem: (product: Product, size: string, color: string) => void;
    removeItem: (id: string, size: string, color: string) => void;
    updateQuantity: (id: string, size: string, color: string, quantity: number) => void;
    clearCart: () => void;
    getTotal: () => number;
    getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (product, size, color) =>
                set((state) => {
                    const existingItem = state.items.find(
                        (item) => item.id === product.id && item.selectedSize === size && item.selectedColor === color
                    );

                    if (existingItem) {
                        return {
                            items: state.items.map((item) =>
                                item.id === product.id && item.selectedSize === size && item.selectedColor === color
                                    ? { ...item, quantity: item.quantity + 1 }
                                    : item
                            ),
                        };
                    }

                    return {
                        items: [...state.items, { ...product, quantity: 1, selectedSize: size, selectedColor: color }],
                    };
                }),

            removeItem: (id, size, color) =>
                set((state) => ({
                    items: state.items.filter(
                        (item) => !(item.id === id && item.selectedSize === size && item.selectedColor === color)
                    ),
                })),

            updateQuantity: (id, size, color, quantity) =>
                set((state) => ({
                    items: state.items.map((item) =>
                        item.id === id && item.selectedSize === size && item.selectedColor === color
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
