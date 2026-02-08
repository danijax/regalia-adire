import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function AboutPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen">
                <div className="container mx-auto px-4 py-16">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8 text-center">
                            About Adire by Regalia
                        </h1>

                        <div className="prose prose-lg max-w-none space-y-6">
                            <section>
                                <h2 className="text-3xl font-serif font-bold text-primary mb-4">
                                    Our Story
                                </h2>
                                <p className="text-lg leading-relaxed">
                                    Adire by Regalia was born from a deep passion for preserving
                                    Nigerian textile heritage while creating contemporary fashion
                                    that celebrates our rich cultural identity. We believe that
                                    every piece of Adire tells a story—a story of tradition,
                                    artistry, and the skilled hands that bring it to life.
                                </p>
                            </section>

                            <section className="bg-muted/30 p-8 rounded-lg">
                                <h2 className="text-3xl font-serif font-bold text-primary mb-4">
                                    The Art of Adire
                                </h2>
                                <p className="text-lg leading-relaxed mb-4">
                                    Adire is a traditional Yoruba resist-dye technique that has
                                    been practiced for centuries. The word "Adire" means "tie and
                                    dye" in Yoruba, and it represents one of Nigeria's most
                                    beautiful and enduring textile traditions.
                                </p>
                                <p className="text-lg leading-relaxed">
                                    Each Adire piece is created using time-honored methods,
                                    including hand-painting, starch-resist dyeing, and intricate
                                    tie-and-dye techniques. The result is a unique pattern that
                                    makes every garment a one-of-a-kind work of art.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-3xl font-serif font-bold text-primary mb-4">
                                    Our Commitment
                                </h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">
                                            Artisan Support
                                        </h3>
                                        <p>
                                            We work directly with skilled Nigerian artisans, ensuring
                                            fair compensation and preserving traditional craftsmanship
                                            for future generations.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">
                                            Quality Materials
                                        </h3>
                                        <p>
                                            Only premium, 100% cotton fabrics and natural dyes are
                                            used in our creations, ensuring both comfort and
                                            authenticity.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">
                                            Sustainable Practices
                                        </h3>
                                        <p>
                                            Our traditional dyeing methods are eco-friendly, using
                                            natural indigo and other plant-based dyes.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">
                                            Cultural Preservation
                                        </h3>
                                        <p>
                                            We're committed to educating and sharing the rich history
                                            of Adire textile art with the world.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="text-center py-8">
                                <p className="text-2xl font-serif italic text-primary">
                                    "When you wear Adire by Regalia, you're not just wearing
                                    fashion—you're wearing history, culture, and art."
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
