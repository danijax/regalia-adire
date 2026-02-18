import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, RotateCcw, Clock, MapPin } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Shipping & Returns — Adire by Regalia",
    description: "Shipping information and return policy for Adire by Regalia.",
};

export default function ShippingReturnsPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen">
                <div className="container mx-auto px-4 py-16 max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
                        Shipping & Returns
                    </h1>
                    <p className="text-lg text-muted-foreground mb-8">
                        Everything you need to know about getting your Adire pieces delivered
                    </p>

                    {/* Shipping Overview Cards */}
                    <div className="grid sm:grid-cols-2 gap-4 mb-12">
                        <Card>
                            <CardContent className="p-6 flex items-start gap-4">
                                <Truck className="h-8 w-8 text-primary flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold mb-1">Lagos Delivery</h3>
                                    <p className="text-sm text-muted-foreground">₦2,500 · 2–4 business days</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-6 flex items-start gap-4">
                                <MapPin className="h-8 w-8 text-primary flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold mb-1">Other Nigerian States</h3>
                                    <p className="text-sm text-muted-foreground">₦5,000 · 3–7 business days</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-6 flex items-start gap-4">
                                <Clock className="h-8 w-8 text-primary flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold mb-1">Processing Time</h3>
                                    <p className="text-sm text-muted-foreground">1–2 business days</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-6 flex items-start gap-4">
                                <RotateCcw className="h-8 w-8 text-primary flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold mb-1">Free Shipping</h3>
                                    <p className="text-sm text-muted-foreground">On orders over ₦50,000</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Detailed Policies */}
                    <div className="space-y-8">
                        <section>
                            <h2 className="text-2xl font-serif font-bold text-primary mb-3">Shipping Policy</h2>
                            <div className="space-y-3 text-foreground/80">
                                <p>
                                    Orders are processed within 1–2 business days (Monday to Friday, excluding public holidays). You will receive a confirmation email once your order has been shipped with tracking information where available.
                                </p>
                                <p>
                                    <strong>Same-day dispatch:</strong> Orders placed before 12:00 PM (WAT) may be dispatched the same day, subject to availability.
                                </p>
                                <p>
                                    <strong>International shipping:</strong> We currently ship within Nigeria only. International shipping is coming soon. If you are outside Nigeria and interested in purchasing, please contact us at <a href="mailto:orders@adirebyregalia.com" className="text-primary hover:underline">orders@adirebyregalia.com</a>.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif font-bold text-primary mb-3">Return Policy</h2>
                            <div className="space-y-3 text-foreground/80">
                                <p>
                                    We want you to love your Adire pieces. If you are not completely satisfied with your purchase, you may return it within <strong>14 days</strong> of delivery for a store credit or exchange.
                                </p>
                                <h3 className="font-semibold text-foreground mt-4">Conditions for Returns</h3>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Items must be unworn, unwashed, and in original condition with tags attached.</li>
                                    <li>Items must be returned in the original packaging.</li>
                                    <li>Sale items and accessories are final sale and cannot be returned.</li>
                                    <li>Custom or made-to-order items cannot be returned.</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif font-bold text-primary mb-3">How to Return an Item</h2>
                            <ol className="list-decimal pl-6 text-foreground/80 space-y-2">
                                <li>Email us at <a href="mailto:returns@adirebyregalia.com" className="text-primary hover:underline">returns@adirebyregalia.com</a> with your order number and reason for return.</li>
                                <li>Wait for our team to approve your return request (within 24–48 hours).</li>
                                <li>Ship the item(s) back to us using the address provided in the approval email.</li>
                                <li>Once we receive and inspect the item, we will process your store credit or exchange within 3–5 business days.</li>
                            </ol>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif font-bold text-primary mb-3">Damaged or Defective Items</h2>
                            <p className="text-foreground/80">
                                If you receive a damaged or defective item, please contact us within 48 hours of delivery with photos of the issue. We will arrange a free replacement or full refund at no cost to you.
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
