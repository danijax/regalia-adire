// Sample product data for demonstration
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
    inStock: boolean;
    featured: boolean;
}

export const products: Product[] = [
    {
        id: "1",
        name: "Indigo Flow Maxi Dress",
        slug: "indigo-flow-maxi-dress",
        description: "Elegant maxi dress featuring traditional Adire indigo patterns. Handcrafted by skilled artisans using time-honored dyeing techniques.",
        price: 18500,
        images: [
            "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800",
            "https://images.unsplash.com/photo-1509319117437-540e50de2b99?w=800",
        ],
        category: "Dresses",
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Indigo", "Navy"],
        inStock: true,
        featured: true,
    },
    {
        id: "2",
        name: "Terracotta Elegance Top",
        slug: "terracotta-elegance-top",
        description: "Vibrant terracotta-dyed top with intricate Adire patterns. Perfect for both casual and formal occasions.",
        price: 12000,
        images: [
            "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800",
            "https://images.unsplash.com/photo-1467043237213-65f2da53396f?w=800",
        ],
        category: "Tops",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Terracotta", "Orange"],
        inStock: true,
        featured: true,
    },
    {
        id: "3",
        name: "Heritage Kaftan",
        slug: "heritage-kaftan",
        description: "Luxurious kaftan showcasing authentic Adire craftsmanship. A statement piece that honors Nigerian textile heritage.",
        price: 25000,
        images: [
            "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800",
            "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800",
        ],
        category: "Dresses",
        sizes: ["One Size"],
        colors: ["Indigo", "Multi"],
        inStock: true,
        featured: true,
    },
    {
        id: "4",
        name: "Contemporary Adire Skirt",
        slug: "contemporary-adire-skirt",
        description: "Modern interpretation of traditional Adire with a contemporary silhouette. Handcrafted with premium fabrics.",
        price: 14500,
        images: [
            "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800",
            "https://images.unsplash.com/photo-1583743814966-8f3f5896ea73?w=800",
        ],
        category: "Bottoms",
        sizes: ["XS", "S", "M", "L"],
        colors: ["Indigo", "Blue"],
        inStock: true,
        featured: false,
    },
    {
        id: "5",
        name: "Artisan Wrap Top",
        slug: "artisan-wrap-top",
        description: "Beautifully crafted wrap top featuring traditional tie-dye patterns. Versatile and elegant.",
        price: 11000,
        images: [
            "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800",
            "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800",
        ],
        category: "Tops",
        sizes: ["S", "M", "L"],
        colors: ["Indigo", "White"],
        inStock: true,
        featured: false,
    },
    {
        id: "6",
        name: "Golden Sunset Dress",
        slug: "golden-sunset-dress",
        description: "Stunning dress with warm golden tones inspired by Nigerian sunsets. Premium Adire craftsmanship.",
        price: 22000,
        images: [
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800",
            "https://images.unsplash.com/photo-1551803091-e20673f15770?w=800",
        ],
        category: "Dresses",
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Gold", "Yellow"],
        inStock: true,
        featured: true,
    },
];

// Format price to Nigerian Naira
export function formatPrice(amount: number): string {
    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 0,
    }).format(amount);
}

// Get featured products
export function getFeaturedProducts(): Product[] {
    return products.filter((product) => product.featured);
}

// Get product by slug
export function getProductBySlug(slug: string): Product | undefined {
    return products.find((product) => product.slug === slug);
}
