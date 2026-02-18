"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCartStore } from "@/lib/store/cartStore";
import { formatPrice } from "@/lib/data/products";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Lock, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
    const { items, getTotal, clearCart } = useCartStore();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        postalCode: "",
    });

    const SHIPPING_LAGOS = 2500;
    const SHIPPING_OUTSIDE = 5000;
    const FREE_SHIPPING_THRESHOLD = 50000;

    const subtotal = getTotal();
    const isLagos = formData.state.toLowerCase().includes("lagos");
    const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : (isLagos ? SHIPPING_LAGOS : SHIPPING_OUTSIDE);
    const total = subtotal + shippingCost;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch("/api/checkout/initiate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    customer: {
                        name: `${formData.firstName} ${formData.lastName}`,
                        email: formData.email,
                        phone: formData.phone,
                    },
                    shippingAddress: {
                        street: formData.address,
                        city: formData.city,
                        state: formData.state,
                        postalCode: formData.postalCode,
                        country: "Nigeria",
                    },
                    items: items.map((item) => ({
                        productId: item.id,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        size: item.selectedSize,
                        image: item.images[0],
                    })),
                    subtotal,
                    shipping: shippingCost,
                    total,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Checkout failed");
            }

            if (data.authorizationUrl) {
                // Redirect to Paystack payment page
                clearCart();
                window.location.href = data.authorizationUrl;
            } else if (data.orderId) {
                // Fallback: go to order confirmation (when Paystack not configured)
                clearCart();
                router.push(`/order-confirmation/${data.orderId}`);
            }
        } catch (error) {
            console.error("Checkout error:", error);
            alert(error instanceof Error ? error.message : "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (items.length === 0) {
        return (
            <>
                <Header />
                <main className="min-h-screen">
                    <div className="container mx-auto px-4 py-16 text-center">
                        <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
                        <h1 className="text-3xl font-serif font-bold mb-4">
                            Your cart is empty
                        </h1>
                        <p className="text-lg text-muted-foreground mb-8">
                            Add some items before checking out
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
                <div className="container mx-auto px-4 py-8">
                    <Link href="/cart">
                        <Button variant="ghost" className="mb-6">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Cart
                        </Button>
                    </Link>

                    <h1 className="text-4xl font-serif font-bold text-primary mb-8">
                        Checkout
                    </h1>

                    <form onSubmit={handleSubmit}>
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Shipping Information */}
                            <div className="lg:col-span-2 space-y-6">
                                <Card>
                                    <CardContent className="p-6">
                                        <h2 className="text-xl font-semibold mb-6">
                                            Contact Information
                                        </h2>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="firstName">First Name</Label>
                                                <Input
                                                    id="firstName"
                                                    name="firstName"
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Amina"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="lastName">Last Name</Label>
                                                <Input
                                                    id="lastName"
                                                    name="lastName"
                                                    value={formData.lastName}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Johnson"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="email">Email</Label>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="amina@example.com"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="phone">Phone</Label>
                                                <Input
                                                    id="phone"
                                                    name="phone"
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="+234 801 234 5678"
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="p-6">
                                        <h2 className="text-xl font-semibold mb-6">
                                            Shipping Address
                                        </h2>
                                        <div className="space-y-4">
                                            <div>
                                                <Label htmlFor="address">Street Address</Label>
                                                <Input
                                                    id="address"
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="123 Lagos Street"
                                                />
                                            </div>
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                <div>
                                                    <Label htmlFor="city">City</Label>
                                                    <Input
                                                        id="city"
                                                        name="city"
                                                        value={formData.city}
                                                        onChange={handleChange}
                                                        required
                                                        placeholder="Lagos"
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="state">State</Label>
                                                    <Input
                                                        id="state"
                                                        name="state"
                                                        value={formData.state}
                                                        onChange={handleChange}
                                                        required
                                                        placeholder="Lagos State"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                <div>
                                                    <Label htmlFor="postalCode">Postal Code</Label>
                                                    <Input
                                                        id="postalCode"
                                                        name="postalCode"
                                                        value={formData.postalCode}
                                                        onChange={handleChange}
                                                        placeholder="100001"
                                                    />
                                                </div>
                                                <div>
                                                    <Label>Country</Label>
                                                    <Input
                                                        value="Nigeria"
                                                        disabled
                                                        className="bg-muted"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Order Summary */}
                            <div>
                                <Card className="sticky top-24">
                                    <CardContent className="p-6 space-y-4">
                                        <h2 className="text-xl font-semibold">Order Summary</h2>

                                        <div className="space-y-3 max-h-[300px] overflow-y-auto">
                                            {items.map((item) => (
                                                <div
                                                    key={`${item.id}-${item.selectedSize}`}
                                                    className="flex gap-3"
                                                >
                                                    <div className="relative w-16 h-20 flex-shrink-0">
                                                        <Image
                                                            src={item.images[0]}
                                                            alt={item.name}
                                                            fill
                                                            className="object-cover rounded-md"
                                                            sizes="64px"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-medium text-sm truncate">
                                                            {item.name}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            Size: {item.selectedSize} • Qty: {item.quantity}
                                                        </p>
                                                        <p className="text-sm font-semibold">
                                                            {formatPrice(item.price * item.quantity)}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="border-t pt-4 space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Subtotal</span>
                                                <span>{formatPrice(subtotal)}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Shipping</span>
                                                <span>
                                                    {shippingCost === 0
                                                        ? "Free"
                                                        : formatPrice(shippingCost)}
                                                </span>
                                            </div>
                                            {subtotal < FREE_SHIPPING_THRESHOLD && (
                                                <p className="text-xs text-muted-foreground">
                                                    Free shipping on orders over {formatPrice(FREE_SHIPPING_THRESHOLD)}
                                                </p>
                                            )}
                                        </div>

                                        <div className="border-t pt-4">
                                            <div className="flex justify-between text-lg font-bold">
                                                <span>Total</span>
                                                <span className="text-primary">
                                                    {formatPrice(total)}
                                                </span>
                                            </div>
                                        </div>

                                        <Button
                                            type="submit"
                                            size="lg"
                                            className="w-full"
                                            disabled={isLoading}
                                        >
                                            <Lock className="mr-2 h-4 w-4" />
                                            {isLoading ? "Processing..." : `Pay ${formatPrice(total)}`}
                                        </Button>

                                        <p className="text-xs text-center text-muted-foreground">
                                            Secured by Paystack. Your payment information is encrypted.
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    );
}
