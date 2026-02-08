"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
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
