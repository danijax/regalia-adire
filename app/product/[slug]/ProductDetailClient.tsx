"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/data/products";
import type { Product } from "@/lib/data/products";
import { useCartStore } from "@/lib/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, ShoppingCart } from "lucide-react";

interface ProductDetailClientProps {
    product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedImage, setSelectedImage] = useState(0);
    const [addedToCart, setAddedToCart] = useState(false);
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("Please select a size");
            return;
        }
        if (!selectedColor) {
            alert("Please select a color");
            return;
        }
        addItem(product, selectedSize, selectedColor);
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    return (
        <>
            <Header />
            <main className="min-h-screen">
                <div className="container mx-auto px-4 py-8">
                    {/* Back Button */}
                    <Link href="/products">
                        <Button variant="ghost" className="mb-6">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Products
                        </Button>
                    </Link>

                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                        {/* Image Gallery */}
                        <div className="space-y-4">
                            <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
                                <Image
                                    src={product.images[selectedImage]}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                            {product.images.length > 1 && (
                                <div className="grid grid-cols-4 gap-2">
                                    {product.images.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImage(index)}
                                            className={`relative aspect-square overflow-hidden rounded-md border-2 transition-all ${selectedImage === index
                                                ? "border-primary"
                                                : "border-transparent"
                                                }`}
                                        >
                                            <Image
                                                src={image}
                                                alt={`${product.name} ${index + 1}`}
                                                fill
                                                className="object-cover"
                                                sizes="100px"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2">
                                    {product.name}
                                </h1>
                                <p className="text-2xl font-bold text-secondary">
                                    {formatPrice(product.price)}
                                </p>
                            </div>

                            <p className="text-lg text-foreground/80">
                                {product.description}
                            </p>

                            {/* Size Selection */}
                            <div>
                                <h3 className="font-semibold mb-3">Select Size</h3>
                                <div className="flex flex-wrap gap-2">
                                    {product.sizes.map((size) => (
                                        <Button
                                            key={size}
                                            variant={selectedSize === size ? "default" : "outline"}
                                            onClick={() => setSelectedSize(size)}
                                            className="w-16"
                                        >
                                            {size}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            {/* Colors */}
                            <div>
                                <h3 className="font-semibold mb-3">Select Color</h3>
                                <div className="flex flex-wrap gap-2">
                                    {product.colors.map((color) => (
                                        <Button
                                            key={color}
                                            variant={selectedColor === color ? "default" : "outline"}
                                            onClick={() => setSelectedColor(color)}
                                            className="px-4"
                                        >
                                            {color}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            {/* Add to Cart */}
                            <div className="space-y-3">
                                <Button
                                    size="lg"
                                    className="w-full"
                                    onClick={handleAddToCart}
                                    disabled={product.stock <= 0}
                                >
                                    {addedToCart ? (
                                        <>
                                            <Check className="mr-2 h-5 w-5" />
                                            Added to Cart!
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingCart className="mr-2 h-5 w-5" />
                                            Add to Cart
                                        </>
                                    )}
                                </Button>
                                {product.stock <= 0 && (
                                    <p className="text-destructive text-center">
                                        Out of Stock
                                    </p>
                                )}
                            </div>

                            {/* Product Details */}
                            <Card>
                                <CardContent className="p-6 space-y-4">
                                    <div>
                                        <h3 className="font-semibold mb-2">Materials & Care</h3>
                                        <p className="text-sm text-muted-foreground">
                                            100% premium cotton with traditional Adire dyeing. Hand
                                            wash in cold water. Lay flat to dry.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-2">Craftsmanship</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Each piece is handcrafted by skilled Nigerian artisans
                                            using time-honored techniques passed down through
                                            generations.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
