"use client";

import Link from "next/link";
import { Sheet, SheetContent } from "@/components/ui/sheet";

interface MobileNavProps {
    open: boolean;
    onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-8">
                    <Link
                        href="/products"
                        className="text-lg font-medium transition-colors hover:text-primary"
                        onClick={onClose}
                    >
                        Shop All
                    </Link>
                    <Link
                        href="/collections"
                        className="text-lg font-medium transition-colors hover:text-primary"
                        onClick={onClose}
                    >
                        Collections
                    </Link>
                    <Link
                        href="/about"
                        className="text-lg font-medium transition-colors hover:text-primary"
                        onClick={onClose}
                    >
                        About
                    </Link>
                    <Link
                        href="/contact"
                        className="text-lg font-medium transition-colors hover:text-primary"
                        onClick={onClose}
                    >
                        Contact
                    </Link>
                </nav>
            </SheetContent>
        </Sheet>
    );
}
