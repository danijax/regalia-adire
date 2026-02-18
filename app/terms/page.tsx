import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service — Adire by Regalia",
    description: "Terms of Service for Adire by Regalia e-commerce store.",
};

export default function TermsPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen">
                <div className="container mx-auto px-4 py-16 max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
                        Terms of Service
                    </h1>
                    <p className="text-muted-foreground mb-8">
                        Last updated: February 2026
                    </p>

                    <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
                        <section>
                            <h2 className="text-2xl font-serif font-bold text-primary">1. Overview</h2>
                            <p className="text-foreground/80 mt-2">
                                This website is operated by Adire by Regalia. Throughout the site, the terms &ldquo;we&rdquo;, &ldquo;us&rdquo;, and &ldquo;our&rdquo; refer to Adire by Regalia. By visiting our site and/or purchasing something from us, you engage in our &ldquo;Service&rdquo; and agree to be bound by these Terms of Service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif font-bold text-primary">2. Online Store Terms</h2>
                            <ul className="list-disc pl-6 text-foreground/80 mt-2 space-y-1">
                                <li>You must be at least 18 years of age or have the consent of a parent or guardian to use this site.</li>
                                <li>You may not use our products for any illegal or unauthorized purpose.</li>
                                <li>A breach or violation of any of these Terms will result in an immediate termination of your Services.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif font-bold text-primary">3. Products and Pricing</h2>
                            <p className="text-foreground/80 mt-2">
                                All prices are displayed in Nigerian Naira (₦). Prices are subject to change without notice. We reserve the right to discontinue any product at any time. We do not warrant that the quality of any products or information obtained by you will meet your expectations.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif font-bold text-primary">4. Accuracy of Information</h2>
                            <p className="text-foreground/80 mt-2">
                                We are not responsible if information made available on this site is not accurate, complete, or current. The material on this site is provided for general information only and should not be relied upon as the sole basis for making decisions. Product colours may vary slightly from images due to the handcrafted nature of Adire textiles.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif font-bold text-primary">5. Purchase and Payment</h2>
                            <p className="text-foreground/80 mt-2">
                                By placing an order through our store, you agree to provide current, complete, and accurate purchase and account information. Payments are processed securely through Paystack. We reserve the right to refuse any order placed through the site.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif font-bold text-primary">6. Intellectual Property</h2>
                            <p className="text-foreground/80 mt-2">
                                All content on this site, including text, graphics, logos, images, and software, is the property of Adire by Regalia and is protected by copyright and intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif font-bold text-primary">7. User Comments and Feedback</h2>
                            <p className="text-foreground/80 mt-2">
                                If you send us comments, suggestions, or feedback, you agree that we may use, reproduce, modify, and distribute such content without restriction or compensation to you.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif font-bold text-primary">8. Limitation of Liability</h2>
                            <p className="text-foreground/80 mt-2">
                                In no case shall Adire by Regalia, our directors, officers, employees, or affiliates be liable for any injury, loss, claim, or any direct, indirect, incidental, or consequential damages arising from your use of the Service or any product purchased.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif font-bold text-primary">9. Governing Law</h2>
                            <p className="text-foreground/80 mt-2">
                                These Terms of Service shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif font-bold text-primary">10. Contact Us</h2>
                            <p className="text-foreground/80 mt-2">
                                Questions about the Terms of Service should be sent to us at <a href="mailto:legal@adirebyregalia.com" className="text-primary hover:underline">legal@adirebyregalia.com</a>.
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
