import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "FAQ | Adire by Regalia",
    description: "Frequently asked questions about Adire by Regalia. Learn about ordering, shipping, returns, sizing, and care for your Adire pieces.",
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
    return children;
}
