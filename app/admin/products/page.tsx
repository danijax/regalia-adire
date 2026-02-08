"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import Link from "next/link";
import useSWR from "swr";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { adminFetcher } from "@/lib/fetcher";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import DeleteProductDialog from "@/components/admin/DeleteProductDialog";
import { useState } from "react";

interface Product {
    id: string;
    name: string;
    slug: string;
    price: number;
    category: string;
    images: string[];
    stock: number;
    featured: boolean;
}

function formatPrice(price: number) {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
    }).format(price);
}

export default function AdminProductsPage() {
    const { data: products, error, isLoading, mutate } = useSWR<Product[]>(
        '/api/admin/products',
        adminFetcher
    );
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<{ id: string; name: string } | null>(null);

    const handleDeleteClick = (product: Product) => {
        setProductToDelete({ id: product.id, name: product.name });
        setDeleteDialogOpen(true);
    };

    const handleDeleted = () => {
        mutate(); // Refresh the products list
    };

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-primary">
                            Products
                        </h1>
                        <p className="text-muted-foreground">
                            Manage your product inventory and listings
                        </p>
                    </div>
                    <Link href="/admin/products/new">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Product
                        </Button>
                    </Link>
                </div>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            <span className="ml-2 text-muted-foreground">Loading products...</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (error) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-primary">
                            Products
                        </h1>
                        <p className="text-muted-foreground">
                            Manage your product inventory and listings
                        </p>
                    </div>
                    <Link href="/admin/products/new">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Product
                        </Button>
                    </Link>
                </div>
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                        Failed to load products. Please try again later.
                        <Button
                            variant="outline"
                            size="sm"
                            className="ml-4"
                            onClick={() => mutate()}
                        >
                            Retry
                        </Button>
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-primary">
                        Products
                    </h1>
                    <p className="text-muted-foreground">
                        Manage your product inventory and listings
                    </p>
                </div>
                <Link href="/admin/products/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Product
                    </Button>
                </Link>
            </div>

            {/* Products Table */}
            <Card>
                <CardHeader>
                    <CardTitle>All Products ({products?.length || 0})</CardTitle>
                </CardHeader>
                <CardContent>
                    {products && products.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground mb-4">No products found</p>
                            <Link href="/admin/products/new">
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Your First Product
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Product</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Stock</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {products?.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="relative h-12 w-12 rounded-md overflow-hidden bg-muted">
                                                    {product.images && product.images.length > 0 ? (
                                                        <img
                                                            src={product.images[0]}
                                                            alt={product.name}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                                                            No Image
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-medium">{product.name}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {product.slug}
                                                    </p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="capitalize">
                                            {product.category}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {formatPrice(product.price)}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    product.stock > 10
                                                        ? "default"
                                                        : product.stock > 0
                                                            ? "outline"
                                                            : "destructive"
                                                }
                                            >
                                                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={product.stock > 0 ? "default" : "outline"}>
                                                {product.stock > 0 ? "Active" : "Inactive"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Link href={`/admin/products/${product.id}/edit`}>
                                                <Button variant="ghost" size="sm">
                                                    Edit
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-destructive"
                                                onClick={() => handleDeleteClick(product)}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            {/* Delete Confirmation Dialog */}
            {productToDelete && (
                <DeleteProductDialog
                    open={deleteDialogOpen}
                    onOpenChange={setDeleteDialogOpen}
                    productId={productToDelete.id}
                    productName={productToDelete.name}
                    onDeleted={handleDeleted}
                />
            )}
        </div>
    );
}
