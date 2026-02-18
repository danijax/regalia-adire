import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy — Adire by Regalia",
    description: "Privacy Policy for Adire by Regalia e-commerce store.",
};

export default function PrivacyPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen">
                <div className="container mx-auto px-4 py-16 max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-muted-foreground mb-8">
                        Last updated: February 2026
                    </p>

                    <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
                        <section>
                            <h2 className="text-2xl font-serif font-bold text-primary">1. Information We Collect</h2>
                            <p className="text-foreground/80 mt-2">
                                When you visit our store, we collect certain information about your device, your interaction with the store, and information necessary to process your purchases. We may also collect additional information if you contact us for customer support.
                            </p>
                            <ul className="list-disc pl-6 text-foreground/80 mt-2 space-y-1">
                                <li><strong>Personal information:</strong> Name, email address, phone number, shipping address, billing address.</li>
                                <li><strong>Order information:</strong> Products purchased, order history, payment details (processed securely by Paystack).</li>
                                <li><strong>Device information:</strong> Browser type, IP address, time zone, cookie information.</li>
                                <li><strong>Browsing information:</strong> Pages viewed, search terms, products viewed.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif font-bold text-primary">2. How We Use Your Information</h2>
                            <ul className="list-disc pl-6 text-foreground/80 mt-2 space-y-1">
                                <li>To process and fulfil your orders, including shipping and payment processing.</li>
                                <li>To communicate with you about your orders, account, or customer service inquiries.</li>
                                <li>To send you marketing communications (with your consent), such as newsletters and promotions.</li>
                                <li>To improve our store, products, and customer experience.</li>
                                <li>To comply with legal obligations.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif font-bold text-primary">3. Payment Security</h2>
                            <p className="text-foreground/80 mt-2">
                                All payments are processed securely through Paystack. We do not store your credit card or bank account details on our servers. Paystack is PCI-DSS compliant, ensuring the highest level of payment security.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif font-bold text-primary">4. Cookies</h2>
                            <p className="text-foreground/80 mt-2">
                                We use cookies to remember your shopping cart, preferences, and to understand how you use our store. You can control cookie settings through your browser preferences.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif font-bold text-primary">5. Third-Party Services</h2>
                            <p className="text-foreground/80 mt-2">
                                We share your information with the following third parties only as necessary to provide our services:
                            </p>
                            <ul className="list-disc pl-6 text-foreground/80 mt-2 space-y-1">
                                <li><strong>Paystack:</strong> Payment processing.</li>
                                <li><strong>Shipping providers:</strong> Order delivery.</li>
                                <li><strong>Analytics services:</strong> Understanding site usage.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif font-bold text-primary">6. Your Rights</h2>
                            <p className="text-foreground/80 mt-2">
                                You have the right to access, correct, or delete your personal data. You may also opt out of marketing communications at any time. To exercise these rights, please contact us at <a href="mailto:privacy@adirebyregalia.com" className="text-primary hover:underline">privacy@adirebyregalia.com</a>.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif font-bold text-primary">7. Data Retention</h2>
                            <p className="text-foreground/80 mt-2">
                                We retain your personal information for as long as necessary to fulfil the purposes outlined in this policy, unless a longer retention period is required by law.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif font-bold text-primary">8. Contact Us</h2>
                            <p className="text-foreground/80 mt-2">
                                If you have questions about this Privacy Policy, please contact us at:
                            </p>
                            <p className="text-foreground/80 mt-1">
                                <strong>Email:</strong> <a href="mailto:privacy@adirebyregalia.com" className="text-primary hover:underline">privacy@adirebyregalia.com</a><br />
                                <strong>Address:</strong> Lagos, Nigeria
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
