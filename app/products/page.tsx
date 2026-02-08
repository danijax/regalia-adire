import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { products } from "@/lib/data/products";

export default function ProductsPage() {
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
