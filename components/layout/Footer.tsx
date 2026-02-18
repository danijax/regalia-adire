"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

export function Footer() {
    const [email, setEmail] = useState("");
    const [subscribing, setSubscribing] = useState(false);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setSubscribing(true);
        try {
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();

            if (res.ok) {
                toast.success(data.message || "Subscribed successfully!");
                setEmail("");
            } else {
                toast.error(data.error || "Failed to subscribe");
            }
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setSubscribing(false);
        }
    };

    return (
        <footer className="border-t bg-muted/30">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-serif font-bold text-primary">
                            Adire by Regalia
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Celebrating Nigerian textile artistry through premium Adire fashion.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" aria-label="Facebook">
                                <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                            </Link>
                            <Link href="#" aria-label="Instagram">
                                <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                            </Link>
                            <Link href="#" aria-label="Twitter">
                                <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                            </Link>
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h4 className="font-semibold mb-4">Shop</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">
                                    Collections
                                </Link>
                            </li>
                            <li>
                                <Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">
                                    New Arrivals
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h4 className="font-semibold mb-4">Customer Service</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/shipping-returns" className="text-muted-foreground hover:text-primary transition-colors">
                                    Shipping & Returns
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-semibold mb-4">Stay Connected</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                            Subscribe to receive updates, access to exclusive deals, and more.
                        </p>
                        <form onSubmit={handleSubscribe} className="flex space-x-2">
                            <Input
                                type="email"
                                placeholder="Your email"
                                className="max-w-[240px]"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <Button type="submit" size="sm" disabled={subscribing}>
                                {subscribing ? "..." : "Subscribe"}
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Adire by Regalia. All rights reserved.</p>
                    <div className="mt-2 space-x-4">
                        <Link href="/privacy" className="hover:text-primary transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-primary transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

