"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/data/products";
import type { Product } from "@/lib/data/products";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <Link href={`/product/${product.slug}`}>
            <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {product.stock <= 0 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-white font-semibold">Out of Stock</span>
                        </div>
                    )}
                </div>
                <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                        {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        {product.description}
                    </p>
                    <p className="text-xl font-bold text-primary">
                        {formatPrice(product.price)}
                    </p>
                </CardContent>
            </Card>
        </Link>
    );
}
