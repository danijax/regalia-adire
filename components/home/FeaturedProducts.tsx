import { ProductCard } from "@/components/product/ProductCard";
import { prisma } from "@/lib/prisma";

export async function FeaturedProducts() {
    const featuredProducts = await prisma.product.findMany({
        where: { featured: true },
        take: 6,
        orderBy: { createdAt: "desc" },
    });

    if (featuredProducts.length === 0) {
        return null;
    }

    return (
        <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
                        Featured Collections
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Discover our carefully curated selection of authentic Adire pieces
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {featuredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
