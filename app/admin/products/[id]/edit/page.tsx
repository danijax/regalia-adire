"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import useSWR from "swr";
import { adminFetcher } from "@/lib/fetcher";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import ImageUpload from "@/components/admin/ImageUpload";
import { ColorPicker } from "@/components/admin/ColorPicker";

interface Category {
    id: string;
    name: string;
    slug: string;
}

interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    images: string[];
    colors: string[];
    featured: boolean;
}

export default function EditProductPage() {
    const router = useRouter();
    const params = useParams();
    const productId = params?.id as string;

    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const { data: categories, isLoading: categoriesLoading } = useSWR<Category[]>(
        "/api/admin/categories",
        adminFetcher
    );
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        images: [] as string[],
        colors: [] as string[],
        featured: false,
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/admin/products/${productId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                const product: Product = await response.json();

                setFormData({
                    name: product.name,
                    slug: product.slug,
                    description: product.description || "",
                    price: product.price.toString(),
                    category: product.category,
                    stock: product.stock.toString(),
                    images: product.images || [],
                    colors: product.colors || [],
                    featured: product.featured,
                });
            } catch (error) {
                console.error('Error fetching product:', error);
                toast.error("Failed to load product");
                router.push('/admin/products');
            } finally {
                setIsFetching(false);
            }
        };

        if (productId) {
            fetchProduct();
        }
    }, [productId, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!formData.name || !formData.slug || !formData.price || !formData.category) {
            toast.error("Please fill in all required fields");
            return;
        }

        if (formData.images.length === 0) {
            toast.error("Please upload at least one product image");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`/api/admin/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    slug: formData.slug,
                    description: formData.description,
                    price: parseFloat(formData.price),
                    category: formData.category,
                    stock: parseInt(formData.stock) || 0,
                    images: formData.images,
                    colors: formData.colors,
                    featured: formData.featured,
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to update product');
            }

            toast.success("Product updated successfully!");
            router.push('/admin/products');
            router.refresh();
        } catch (error: any) {
            console.error('Error updating product:', error);
            toast.error(error.message || "Failed to update product. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    const handleNameChange = (name: string) => {
        setFormData(prev => ({
            ...prev,
            name,
        }));
    };

    if (isFetching) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2 text-muted-foreground">Loading product...</span>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/admin/products">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-serif font-bold text-primary">
                        Edit Product
                    </h1>
                    <p className="text-muted-foreground">
                        Update product information
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="name">
                                    Product Name <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => handleNameChange(e.target.value)}
                                    placeholder="e.g. Indigo Flow Maxi Dress"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="slug">
                                    URL Slug <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="slug"
                                    value={formData.slug}
                                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                                    placeholder="indigo-flow-maxi-dress"
                                    required
                                />
                                <p className="text-xs text-muted-foreground">
                                    Changing this will affect the product URL
                                </p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                placeholder="Describe your product..."
                                rows={4}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Pricing & Inventory */}
                <Card>
                    <CardHeader>
                        <CardTitle>Pricing & Inventory</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="space-y-2">
                                <Label htmlFor="price">
                                    Price (₦) <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="price"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={formData.price}
                                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                                    placeholder="18500.00"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category">
                                    Category <span className="text-destructive">*</span>
                                </Label>
                                <Select
                                    value={formData.category}
                                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                                >
                                    <SelectTrigger id="category">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categoriesLoading ? (
                                            <div className="flex items-center justify-center p-2">
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            </div>
                                        ) : (
                                            categories?.map((cat) => (
                                                <SelectItem key={cat.id} value={cat.slug}>
                                                    {cat.name}
                                                </SelectItem>
                                            ))
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="stock">Stock Quantity</Label>
                                <Input
                                    id="stock"
                                    type="number"
                                    min="0"
                                    value={formData.stock}
                                    onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
                                    placeholder="0"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="featured"
                                checked={formData.featured}
                                onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                                className="h-4 w-4 rounded border-gray-300"
                            />
                            <Label htmlFor="featured" className="cursor-pointer">
                                Feature this product on the homepage
                            </Label>
                        </div>
                    </CardContent>
                </Card>

                {/* Product Images */}
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Product Images <span className="text-destructive">*</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ImageUpload
                            value={formData.images}
                            onChange={(urls) => setFormData(prev => ({ ...prev, images: urls }))}
                            maxImages={5}
                        />
                    </CardContent>
                </Card>

                {/* Available Colors */}
                <Card>
                    <CardHeader>
                        <CardTitle>Available Colors</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ColorPicker
                            value={formData.colors}
                            onChange={(colors) => setFormData(prev => ({ ...prev, colors }))}
                            maxColors={5}
                        />
                    </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Updating..." : "Update Product"}
                    </Button>
                    <Link href="/admin/products">
                        <Button type="button" variant="outline" disabled={isLoading}>
                            Cancel
                        </Button>
                    </Link>
                </div>
            </form>
        </div>
    );
}
