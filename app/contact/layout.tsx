import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | Adire by Regalia",
    description: "Get in touch with Adire by Regalia. Send us a message, call us, or visit our showroom in Lagos, Nigeria.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children;
}
