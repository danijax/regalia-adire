import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { prisma } from "@/lib/prisma";

export default async function ProductsPage() {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
    });

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

                    {/* Product Grid */}
                    {products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <p className="text-xl text-muted-foreground">
                                No products available yet. Check back soon!
                            </p>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
