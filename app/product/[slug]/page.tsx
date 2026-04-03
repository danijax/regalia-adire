import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "./ProductDetailClient";
import type { Metadata } from "next";
import { showAiTryon, showProductReviews, showCustomizedProducts } from "@/lib/flags";

interface ProductPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const { slug } = await params;
    const product = await prisma.product.findUnique({ where: { slug } });

    if (!product) {
        return { title: "Product Not Found | Adire by Regalia" };
    }

    return {
        title: `${product.name} | Adire by Regalia`,
        description: product.description.substring(0, 160),
        openGraph: {
            title: product.name,
            description: product.description.substring(0, 160),
            images: product.images[0] ? [product.images[0]] : [],
        },
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug } = await params;

    const product = await prisma.product.findUnique({
        where: { slug },
    });

    if (!product) {
        notFound();
    }

    // Fetch related products (same category, excluding current)
    const relatedProducts = await prisma.product.findMany({
        where: {
            category: product.category,
            id: { not: product.id },
        },
        take: 4,
        orderBy: { createdAt: "desc" },
    });

    // Evaluate feature flags server-side
    const [aiTryonEnabled, reviewsEnabled, customizationEnabled] =
        await Promise.all([
            showAiTryon(),
            showProductReviews(),
            showCustomizedProducts(),
        ]);

    return (
        <ProductDetailClient
            product={product}
            relatedProducts={JSON.parse(JSON.stringify(relatedProducts))}
            aiTryonEnabled={aiTryonEnabled}
            reviewsEnabled={reviewsEnabled}
            customizationEnabled={customizationEnabled}
        />
    );
}


