import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";
import { ProductsClient } from "./ProductsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Shop All Products | Adire by Regalia",
    description: "Browse our complete collection of authentic Adire fashion pieces. Filter by category, size, color, and price.",
};

export default async function ProductsPage() {
    const [products, categories] = await Promise.all([
        prisma.product.findMany({ orderBy: { createdAt: "desc" } }),
        prisma.category.findMany({ orderBy: { name: "asc" } }),
    ]);

    return (
        <>
            <Header />
            <main className="min-h-screen">
                <div className="container mx-auto px-4 py-12">
                    {/* Page Header */}
                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
                            Shop All Products
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Discover our complete collection of authentic Adire pieces
                        </p>
                    </div>

                    <ProductsClient
                        categories={categories}
                        initialProducts={JSON.parse(JSON.stringify(products))}
                    />
                </div>
            </main>
            <Footer />
        </>
    );
}
