import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { AdireStory } from "@/components/home/AdireStory";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturedProducts />
        <AdireStory />
      </main>
      <Footer />
    </>
  );
}
