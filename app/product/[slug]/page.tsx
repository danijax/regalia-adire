import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "./ProductDetailClient";
import type { Metadata } from "next";

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

    return (
        <ProductDetailClient
            product={product}
            relatedProducts={JSON.parse(JSON.stringify(relatedProducts))}
        />
    );
}

