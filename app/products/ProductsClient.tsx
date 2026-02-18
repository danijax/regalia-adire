"use client";

import { useState, useEffect, useCallback } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2, SlidersHorizontal, X } from "lucide-react";
import type { Product } from "@/lib/data/products";

interface ProductsClientProps {
    categories: { id: string; name: string; slug: string }[];
    initialProducts: Product[];
}

export function ProductsClient({ categories, initialProducts }: ProductsClientProps) {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [loading, setLoading] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    // Filter states
    const [selectedCategory, setSelectedCategory] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [sortBy, setSortBy] = useState("newest");

    // Radix Select does not allow empty string values
    const ALL_VALUE = "__all__";
    const toSelectValue = (v: string) => v || ALL_VALUE;
    const fromSelectValue = (v: string) => v === ALL_VALUE ? "" : v;

    const allSizes = ["XS", "S", "M", "L", "XL", "XXL"];
    const allColors = ["Indigo", "White", "Brown", "Gold", "Terracotta", "Navy", "Black", "Cream"];

    const activeFilterCount = [selectedCategory, minPrice, maxPrice, selectedSize, selectedColor]
        .filter(Boolean).length;

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (selectedCategory) params.set("category", selectedCategory);
            if (minPrice) params.set("minPrice", minPrice);
            if (maxPrice) params.set("maxPrice", maxPrice);
            if (selectedSize) params.set("size", selectedSize);
            if (selectedColor) params.set("color", selectedColor);
            if (sortBy) params.set("sort", sortBy);

            const res = await fetch(`/api/products?${params.toString()}`);
            const data = await res.json();
            setProducts(Array.isArray(data) ? data : []);
        } catch {
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }, [selectedCategory, minPrice, maxPrice, selectedSize, selectedColor, sortBy]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const clearFilters = () => {
        setSelectedCategory("");
        setMinPrice("");
        setMaxPrice("");
        setSelectedSize("");
        setSelectedColor("");
        setSortBy("newest");
    };

    return (
        <div>
            {/* Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        onClick={() => setShowFilters(!showFilters)}
                        className="gap-2"
                    >
                        <SlidersHorizontal className="h-4 w-4" />
                        Filters
                        {activeFilterCount > 0 && (
                            <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                                {activeFilterCount}
                            </Badge>
                        )}
                    </Button>
                    {activeFilterCount > 0 && (
                        <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1 text-muted-foreground">
                            <X className="h-3 w-3" />
                            Clear all
                        </Button>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                        {products.length} product{products.length !== 1 ? "s" : ""}
                    </span>
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="newest">Newest</SelectItem>
                            <SelectItem value="price-asc">Price: Low to High</SelectItem>
                            <SelectItem value="price-desc">Price: High to Low</SelectItem>
                            <SelectItem value="name-asc">Name: A to Z</SelectItem>
                            <SelectItem value="name-desc">Name: Z to A</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Filter Panel */}
            {showFilters && (
                <div className="border rounded-lg p-6 mb-8 bg-muted/20 animate-in slide-in-from-top-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                        {/* Category */}
                        <div>
                            <Label className="mb-2 block text-sm font-medium">Category</Label>
                            <Select value={toSelectValue(selectedCategory)} onValueChange={(v) => setSelectedCategory(fromSelectValue(v))}>
                                <SelectTrigger>
                                    <SelectValue placeholder="All categories" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={ALL_VALUE}>All Categories</SelectItem>
                                    {categories.map((cat) => (
                                        <SelectItem key={cat.id} value={cat.name}>
                                            {cat.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Price Range */}
                        <div>
                            <Label className="mb-2 block text-sm font-medium">Price Range</Label>
                            <div className="flex gap-2">
                                <Input
                                    type="number"
                                    placeholder="Min"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                    className="w-full"
                                />
                                <Input
                                    type="number"
                                    placeholder="Max"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    className="w-full"
                                />
                            </div>
                        </div>

                        {/* Size */}
                        <div>
                            <Label className="mb-2 block text-sm font-medium">Size</Label>
                            <Select value={toSelectValue(selectedSize)} onValueChange={(v) => setSelectedSize(fromSelectValue(v))}>
                                <SelectTrigger>
                                    <SelectValue placeholder="All sizes" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={ALL_VALUE}>All Sizes</SelectItem>
                                    {allSizes.map((size) => (
                                        <SelectItem key={size} value={size}>{size}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Color */}
                        <div>
                            <Label className="mb-2 block text-sm font-medium">Color</Label>
                            <Select value={toSelectValue(selectedColor)} onValueChange={(v) => setSelectedColor(fromSelectValue(v))}>
                                <SelectTrigger>
                                    <SelectValue placeholder="All colors" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={ALL_VALUE}>All Colors</SelectItem>
                                    {allColors.map((color) => (
                                        <SelectItem key={color} value={color}>{color}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Apply button on mobile */}
                        <div className="flex items-end sm:col-span-2 lg:col-span-1">
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => setShowFilters(false)}
                            >
                                Done
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Product Grid */}
            {loading ? (
                <div className="flex items-center justify-center py-16">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            ) : products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <p className="text-xl text-muted-foreground mb-4">
                        No products match your filters
                    </p>
                    <Button variant="outline" onClick={clearFilters}>
                        Clear Filters
                    </Button>
                </div>
            )}
        </div>
    );
}
