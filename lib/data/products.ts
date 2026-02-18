// Product type matching the Prisma schema
export interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    images: string[];
    category: string;
    sizes: string[];
    colors: string[];
    stock: number;
    featured: boolean;
    createdAt: Date | string;
    updatedAt: Date | string;
}

// Format price to Nigerian Naira
export function formatPrice(amount: number): string {
    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 0,
    }).format(amount);
}
