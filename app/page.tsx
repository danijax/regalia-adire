import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { AdireStory } from "@/components/home/AdireStory";
import {
    showNewHeroBanner,
    showLoyaltyProgram,
    homepageLayout,
    showCustomizedProducts,
} from "@/lib/flags";

export default async function Home() {
    // Evaluate feature flags server-side
    const [newHeroBanner, loyaltyEnabled, layout, customizedEnabled] =
        await Promise.all([
            showNewHeroBanner(),
            showLoyaltyProgram(),
            homepageLayout(),
            showCustomizedProducts(),
        ]);

    return (
        <>
            <Header />
            <main>
                <HeroSection variant={newHeroBanner ? "v2" : "default"} />
                <FeaturedProducts showLoyaltyBadges={loyaltyEnabled} />
                {customizedEnabled && (
                    <section className="py-16 bg-muted/30">
                        <div className="container mx-auto px-4 text-center">
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
                                Customize Your Adire
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                                Design your own unique piece — choose patterns, colors, and
                                styles that reflect your personal taste.
                            </p>
                            <a
                                href="/products?customize=true"
                                className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
                            >
                                Start Customizing
                            </a>
                        </div>
                    </section>
                )}
                <AdireStory />
            </main>
            <Footer />
        </>
    );
}
