"use client";

import { useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import { adminFetcher } from "@/lib/fetcher";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Category {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    createdAt: string;
    updatedAt: string;
}

export default function CategoriesPage() {
    const { data: categories, error, isLoading, mutate } = useSWR<Category[]>(
        "/api/admin/categories",
        adminFetcher
    );
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleDelete = async (category: Category) => {
        if (!confirm(`Are you sure you want to delete "${category.name}"?`)) {
            return;
        }

        setDeletingId(category.id);
        try {
            const response = await fetch(`/api/admin/categories/${category.id}`, {
                method: "DELETE",
                credentials: "include",
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Failed to delete category");
            }

            toast.success("Category deleted successfully");
            mutate(); // Revalidate the list
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setDeletingId(null);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4">
                <Card className="border-destructive">
                    <CardContent className="pt-6">
                        <p className="text-destructive">Failed to load categories</p>
                        <Button onClick={() => mutate()} className="mt-4">
                            Retry
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
                    <p className="text-muted-foreground">
                        Manage product categories for your store
                    </p>
                </div>
                <Link href="/admin/categories/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Category
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Categories ({categories?.length || 0})</CardTitle>
                    <CardDescription>
                        Categories help organize your products
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {categories && categories.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Slug</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {categories.map((category) => (
                                    <TableRow key={category.id}>
                                        <TableCell className="font-medium">
                                            {category.name}
                                        </TableCell>
                                        <TableCell>
                                            <code className="bg-muted px-2 py-1 rounded text-sm">
                                                {category.slug}
                                            </code>
                                        </TableCell>
                                        <TableCell className="max-w-md truncate">
                                            {category.description || (
                                                <span className="text-muted-foreground italic">
                                                    No description
                                                </span>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link href={`/admin/categories/${category.id}/edit`}>
                                                    <Button variant="ghost" size="sm">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDelete(category)}
                                                    disabled={deletingId === category.id}
                                                >
                                                    {deletingId === category.id ? (
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                    ) : (
                                                        <Trash2 className="h-4 w-4 text-destructive" />
                                                    )}
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground mb-4">
                                No categories yet. Create your first category to get started.
                            </p>
                            <Link href="/admin/categories/new">
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Category
                                </Button>
                            </Link>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
