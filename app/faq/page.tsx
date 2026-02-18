"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
    question: string;
    answer: string;
}

const faqSections: { title: string; items: FAQItem[] }[] = [
    {
        title: "Ordering",
        items: [
            {
                question: "How do I place an order?",
                answer: "Browse our products, select your size, and add items to your cart. When you're ready, click \"Proceed to Checkout\", fill in your shipping details, and complete your payment securely through Paystack.",
            },
            {
                question: "Can I modify or cancel my order?",
                answer: "You can modify or cancel your order within 2 hours of placing it. Please contact us immediately at orders@adirebyregalia.com. Once an order has been dispatched, it cannot be cancelled.",
            },
            {
                question: "What payment methods do you accept?",
                answer: "We accept all major debit and credit cards, bank transfers, and USSD payments through Paystack. All payments are processed securely.",
            },
        ],
    },
    {
        title: "Shipping",
        items: [
            {
                question: "How long does delivery take?",
                answer: "Orders within Lagos are delivered in 2–4 business days. Delivery to other Nigerian states takes 3–7 business days. Processing time is 1–2 business days.",
            },
            {
                question: "How much does shipping cost?",
                answer: "Shipping within Lagos is ₦2,500, and to other Nigerian states is ₦5,000. Orders over ₦50,000 qualify for free shipping.",
            },
            {
                question: "Do you ship internationally?",
                answer: "We currently ship within Nigeria only. International shipping is coming soon. Please contact us at orders@adirebyregalia.com if you're outside Nigeria.",
            },
        ],
    },
    {
        title: "Products",
        items: [
            {
                question: "Are your products truly handmade?",
                answer: "Yes! Every Adire piece is handcrafted by skilled Nigerian artisans using traditional tie-dye and resist-dyeing techniques passed down through generations.",
            },
            {
                question: "Why do colours vary slightly from the images?",
                answer: "Because each piece is hand-dyed using natural processes, slight colour variations are normal and make each item unique. This is a hallmark of authentic Adire craftsmanship.",
            },
            {
                question: "How do I find my size?",
                answer: "Each product page includes available sizes. If you're between sizes, we recommend sizing up for a comfortable fit. For specific measurements, please contact us.",
            },
        ],
    },
    {
        title: "Care Instructions",
        items: [
            {
                question: "How should I wash my Adire clothing?",
                answer: "Hand wash in cold water with mild detergent. Do not bleach or use harsh chemicals. Lay flat to dry away from direct sunlight to preserve the vibrant colours.",
            },
            {
                question: "Can I iron Adire clothing?",
                answer: "Yes, you can iron on a low setting. We recommend ironing on the reverse side or using a pressing cloth to protect the dye patterns.",
            },
            {
                question: "How do I store my Adire pieces?",
                answer: "Store in a cool, dry place away from direct sunlight. Fold neatly or hang on padded hangers. Avoid storing with strong-smelling items as the fabric may absorb odours.",
            },
        ],
    },
    {
        title: "Returns & Exchanges",
        items: [
            {
                question: "What is your return policy?",
                answer: "We accept returns within 14 days of delivery for store credit or exchange. Items must be unworn, unwashed, and in original condition with tags attached.",
            },
            {
                question: "How do I start a return?",
                answer: "Email us at returns@adirebyregalia.com with your order number and reason for return. Our team will respond within 24–48 hours with return instructions.",
            },
            {
                question: "What if I receive a damaged item?",
                answer: "Contact us within 48 hours of delivery with photos of the damage. We'll arrange a free replacement or full refund at no cost to you.",
            },
        ],
    },
];

function FAQAccordionItem({ item }: { item: FAQItem }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b last:border-b-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center py-4 text-left hover:text-primary transition-colors"
            >
                <span className="font-medium pr-4">{item.question}</span>
                <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </button>
            {isOpen && (
                <div className="pb-4 text-foreground/80 text-sm leading-relaxed">
                    {item.answer}
                </div>
            )}
        </div>
    );
}

export default function FAQPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen">
                <div className="container mx-auto px-4 py-16 max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-lg text-muted-foreground mb-12">
                        Find answers to common questions about shopping with Adire by Regalia
                    </p>

                    <div className="space-y-10">
                        {faqSections.map((section) => (
                            <div key={section.title}>
                                <h2 className="text-2xl font-serif font-bold text-primary mb-4">
                                    {section.title}
                                </h2>
                                <div className="border rounded-lg px-4">
                                    {section.items.map((item) => (
                                        <FAQAccordionItem key={item.question} item={item} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center p-8 bg-muted/30 rounded-lg">
                        <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
                        <p className="text-muted-foreground mb-4">
                            Our team is happy to help. Reach out to us anytime.
                        </p>
                        <a
                            href="mailto:support@adirebyregalia.com"
                            className="text-primary font-medium hover:underline"
                        >
                            support@adirebyregalia.com
                        </a>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
