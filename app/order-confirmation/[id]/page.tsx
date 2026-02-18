import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/data/products";
import { CheckCircle, Package, Mail } from "lucide-react";
import Link from "next/link";

interface OrderItem {
    name: string;
    price: number;
    quantity: number;
    size: string;
}

interface OrderConfirmationProps {
    params: Promise<{ id: string }>;
}

export default async function OrderConfirmationPage({ params }: OrderConfirmationProps) {
    const { id } = await params;

    const order = await prisma.order.findUnique({
        where: { id },
    });

    if (!order) {
        notFound();
    }

    const items = order.items as unknown as OrderItem[];

    return (
        <>
            <Header />
            <main className="min-h-screen">
                <div className="container mx-auto px-4 py-12 max-w-2xl">
                    {/* Success Header */}
                    <div className="text-center mb-8">
                        <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
                        <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2">
                            Order Confirmed!
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Thank you for shopping with Adire by Regalia
                        </p>
                    </div>

                    {/* Order Details */}
                    <Card className="mb-6">
                        <CardContent className="p-6 space-y-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-muted-foreground">Order Number</p>
                                    <p className="text-lg font-bold font-mono">{order.orderNumber}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-muted-foreground">Status</p>
                                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium capitalize">
                                        {order.status}
                                    </span>
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <h3 className="font-semibold mb-3">Items Ordered</h3>
                                <div className="space-y-3">
                                    {items.map((item, index) => (
                                        <div key={index} className="flex justify-between">
                                            <div>
                                                <p className="font-medium">{item.name}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    Size: {item.size} • Qty: {item.quantity}
                                                </p>
                                            </div>
                                            <p className="font-semibold">
                                                {formatPrice(item.price * item.quantity)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="border-t pt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>{formatPrice(order.subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span>
                                        {order.shipping === 0 ? "Free" : formatPrice(order.shipping)}
                                    </span>
                                </div>
                                <div className="flex justify-between text-lg font-bold border-t pt-2">
                                    <span>Total</span>
                                    <span className="text-primary">{formatPrice(order.total)}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Info Cards */}
                    <div className="grid sm:grid-cols-2 gap-4 mb-8">
                        <Card>
                            <CardContent className="p-4 flex items-start gap-3">
                                <Mail className="h-5 w-5 text-primary mt-0.5" />
                                <div>
                                    <p className="font-medium text-sm">Confirmation Email</p>
                                    <p className="text-xs text-muted-foreground">
                                        A confirmation has been sent to {order.customerEmail}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4 flex items-start gap-3">
                                <Package className="h-5 w-5 text-primary mt-0.5" />
                                <div>
                                    <p className="font-medium text-sm">Shipping Updates</p>
                                    <p className="text-xs text-muted-foreground">
                                        We&apos;ll notify you when your order ships
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Continue Shopping */}
                    <div className="text-center">
                        <Link href="/products">
                            <Button size="lg">Continue Shopping</Button>
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
