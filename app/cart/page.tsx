"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCartStore } from "@/lib/store/cartStore";
import { formatPrice } from "@/lib/data/products";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

export default function CartPage() {
    const { items, updateQuantity, removeItem, getTotal } = useCartStore();

    if (items.length === 0) {
        return (
            <>
                <Header />
                <main className="min-h-screen">
                    <div className="container mx-auto px-4 py-16 text-center">
                        <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
                        <h1 className="text-3xl font-serif font-bold mb-4">
                            Your Cart is Empty
                        </h1>
                        <p className="text-lg text-muted-foreground mb-8">
                            Start shopping to add items to your cart
                        </p>
                        <Link href="/products">
                            <Button size="lg">Browse Products</Button>
                        </Link>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="min-h-screen">
                <div className="container mx-auto px-4 py-12">
                    <h1 className="text-4xl font-serif font-bold text-primary mb-8">
                        Shopping Cart
                    </h1>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {items.map((item) => (
                                <Card key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}>
                                    <CardContent className="p-4">
                                        <div className="flex gap-4">
                                            {/* Product Image */}
                                            <div className="relative w-24 h-32 flex-shrink-0">
                                                <Image
                                                    src={item.images[0]}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover rounded-md"
                                                    sizes="96px"
                                                />
                                            </div>

                                            {/* Product Details */}
                                            <div className="flex-1">
                                                <Link href={`/product/${item.slug}`}>
                                                    <h3 className="font-semibold text-lg hover:text-primary transition-colors">
                                                        {item.name}
                                                    </h3>
                                                </Link>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    Size: {item.selectedSize} • Color: {item.selectedColor}
                                                </p>
                                                <p className="text-lg font-bold text-primary mt-2">
                                                    {formatPrice(item.price)}
                                                </p>

                                                <div className="flex items-center gap-4 mt-4">
                                                    {/* Quantity Controls */}
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    item.id,
                                                                    item.selectedSize,
                                                                    item.selectedColor,
                                                                    item.quantity - 1
                                                                )
                                                            }
                                                        >
                                                            <Minus className="h-4 w-4" />
                                                        </Button>
                                                        <span className="w-12 text-center font-semibold">
                                                            {item.quantity}
                                                        </span>
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    item.id,
                                                                    item.selectedSize,
                                                                    item.selectedColor,
                                                                    item.quantity + 1
                                                                )
                                                            }
                                                        >
                                                            <Plus className="h-4 w-4" />
                                                        </Button>
                                                    </div>

                                                    {/* Remove Button */}
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            removeItem(item.id, item.selectedSize, item.selectedColor)
                                                        }
                                                        className="text-destructive hover:text-destructive"
                                                    >
                                                        <Trash2 className="h-4 w-4 mr-2" />
                                                        Remove
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <Card className="sticky top-24">
                                <CardContent className="p-6 space-y-4">
                                    <h2 className="text-2xl font-serif font-bold">
                                        Order Summary
                                    </h2>

                                    <div className="space-y-2 py-4 border-y">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Subtotal</span>
                                            <span className="font-semibold">
                                                {formatPrice(getTotal())}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Shipping</span>
                                            <span className="text-sm text-muted-foreground">
                                                Calculated at checkout
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Total</span>
                                        <span className="text-primary">
                                            {formatPrice(getTotal())}
                                        </span>
                                    </div>

                                    <Link href="/checkout">
                                        <Button size="lg" className="w-full">
                                            Proceed to Checkout
                                        </Button>
                                    </Link>

                                    <Link href="/products">
                                        <Button variant="outline" size="lg" className="w-full">
                                            Continue Shopping
                                        </Button>
                                    </Link>
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
