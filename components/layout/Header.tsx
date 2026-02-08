"use client";

import Link from "next/link";
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { MobileNav } from "./MobileNav";

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-2xl font-serif font-bold text-primary">
                        Adire by Regalia
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    <Link
                        href="/products"
                        className="transition-colors hover:text-primary"
                    >
                        Shop All
                    </Link>
                    <Link
                        href="/collections"
                        className="transition-colors hover:text-primary"
                    >
                        Collections
                    </Link>
                    <Link href="/about" className="transition-colors hover:text-primary">
                        About
                    </Link>
                    <Link
                        href="/contact"
                        className="transition-colors hover:text-primary"
                    >
                        Contact
                    </Link>
                </nav>

                {/* Right side actions */}
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="icon" aria-label="Search">
                        <Search className="h-5 w-5" />
                    </Button>
                    <Link href="/cart">
                        <Button variant="ghost" size="icon" aria-label="Shopping cart">
                            <ShoppingCart className="h-5 w-5" />
                            <span className="sr-only">Shopping cart</span>
                        </Button>
                    </Link>

                    {/* Mobile menu button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </Button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <MobileNav open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
        </header>
    );
}
