import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "./ProductDetailClient";

interface ProductPageProps {
    params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug } = await params;

    const product = await prisma.product.findUnique({
        where: { slug },
    });

    if (!product) {
        notFound();
    }

    return <ProductDetailClient product={product} />;
}
