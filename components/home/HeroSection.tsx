"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface HeroSectionProps {
    variant?: "default" | "v2";
}

export function HeroSection({ variant = "default" }: HeroSectionProps) {
    if (variant === "v2") {
        return (
            <section className="relative h-[700px] md:h-[800px] flex items-center justify-center bg-gradient-to-br from-primary/30 via-secondary/15 to-accent/25 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509319117437-540e50de2b99?w=1600')] bg-cover bg-center opacity-15" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

                <div className="relative z-10 container mx-auto px-4 text-center">
                    <span className="inline-block text-sm font-semibold uppercase tracking-widest text-secondary mb-4">
                        Premium Nigerian Fashion
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-primary mb-6 leading-tight">
                        Adire by Regalia
                    </h1>
                    <p className="text-xl md:text-2xl text-foreground/80 mb-10 max-w-3xl mx-auto leading-relaxed">
                        Celebrating Nigerian textile artistry through premium,
                        handcrafted Adire fashion — where tradition meets contemporary elegance.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/products">
                            <Button size="lg" className="text-lg px-10 py-6">
                                Explore Collection
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Link href="/about">
                            <Button size="lg" variant="outline" className="text-lg px-10 py-6">
                                Our Story
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="relative h-[600px] md:h-[700px] flex items-center justify-center bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509319117437-540e50de2b99?w=1600')] bg-cover bg-center opacity-20" />

            <div className="relative z-10 container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-primary mb-6">
                    Adire by Regalia
                </h1>
                <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-2xl mx-auto">
                    Celebrating Nigerian textile artistry through premium, handcrafted Adire fashion
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/products">
                        <Button size="lg" className="text-lg px-8">
                            Shop Now
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                    <Link href="/about">
                        <Button size="lg" variant="outline" className="text-lg px-8">
                            Our Story
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}

