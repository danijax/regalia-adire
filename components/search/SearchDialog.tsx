"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/data/products";
import type { Product } from "@/lib/data/products";

interface SearchDialogProps {
    open: boolean;
    onClose: () => void;
}

export function SearchDialog({ open, onClose }: SearchDialogProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const debounceRef = useRef<NodeJS.Timeout | undefined>(undefined);

    const searchProducts = useCallback(async (searchQuery: string) => {
        if (!searchQuery.trim()) {
            setResults([]);
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`/api/products?search=${encodeURIComponent(searchQuery)}`);
            const data = await res.json();
            setResults(Array.isArray(data) ? data : []);
        } catch {
            setResults([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => searchProducts(query), 300);
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, [query, searchProducts]);

    useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            setQuery("");
            setResults([]);
        }
    }, [open]);

    // Keyboard shortcut
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                if (!open) {
                    // Parent will handle opening
                }
            }
            if (e.key === "Escape" && open) {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100]">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Dialog */}
            <div className="relative mx-auto mt-[10vh] w-[90%] max-w-lg">
                <div className="bg-background rounded-xl shadow-2xl border overflow-hidden">
                    {/* Search Input */}
                    <div className="flex items-center gap-3 px-4 border-b">
                        <Search className="h-5 w-5 text-muted-foreground shrink-0" />
                        <Input
                            ref={inputRef}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search products..."
                            className="border-0 focus-visible:ring-0 text-lg py-6"
                        />
                        {query && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="shrink-0"
                                onClick={() => setQuery("")}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>

                    {/* Results */}
                    <div className="max-h-[60vh] overflow-y-auto">
                        {loading && (
                            <div className="flex items-center justify-center py-8">
                                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                            </div>
                        )}

                        {!loading && query && results.length === 0 && (
                            <div className="py-8 text-center text-muted-foreground">
                                <p className="text-lg font-medium">No products found</p>
                                <p className="text-sm mt-1">Try a different search term</p>
                            </div>
                        )}

                        {!loading && results.length > 0 && (
                            <div className="py-2">
                                {results.map((product) => (
                                    <Link
                                        key={product.id}
                                        href={`/product/${product.slug}`}
                                        onClick={onClose}
                                        className="flex items-center gap-4 px-4 py-3 hover:bg-muted/50 transition-colors"
                                    >
                                        <div className="relative h-14 w-14 rounded-md overflow-hidden bg-muted shrink-0">
                                            {product.images[0] && (
                                                <Image
                                                    src={product.images[0]}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover"
                                                    sizes="56px"
                                                />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium truncate">{product.name}</p>
                                            <p className="text-sm text-muted-foreground">{product.category}</p>
                                        </div>
                                        <p className="font-semibold text-primary shrink-0">
                                            {formatPrice(product.price)}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        )}

                        {!loading && !query && (
                            <div className="py-8 text-center text-muted-foreground">
                                <p className="text-sm">Start typing to search products</p>
                                <p className="text-xs mt-2 opacity-70">Press ESC to close</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
