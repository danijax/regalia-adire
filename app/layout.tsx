import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Adire by Regalia - Premium Nigerian Fashion",
  description: "Discover premium Adire fashion pieces that celebrate Nigerian textile artistry. Shop authentic, handcrafted Adire clothing and accessories.",
  keywords: ["Adire", "Nigerian fashion", "African fashion", "traditional clothing", "premium fashion"],
  openGraph: {
    title: "Adire by Regalia",
    description: "Premium Adire fashion celebrating Nigerian textile artistry",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
