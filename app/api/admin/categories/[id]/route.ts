import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET /api/admin/categories/[id] - Get single category
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const category = await prisma.category.findUnique({
            where: { id },
        });

        if (!category) {
            return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }

        return NextResponse.json(category);
    } catch (error) {
        console.error("Error fetching category:", error);
        return NextResponse.json(
            { error: "Failed to fetch category" },
            { status: 500 }
        );
    }
}

// PUT /api/admin/categories/[id] - Update category
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();
        const { name, description } = body;

        // Check if category exists
        const existingCategory = await prisma.category.findUnique({
            where: { id },
        });

        if (!existingCategory) {
            return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }

        // If name is changing, check for conflicts and regenerate slug
        let slug = existingCategory.slug;
        if (name && name !== existingCategory.name) {
            slug = name.toLowerCase().replace(/\s+/g, "-");

            const slugExists = await prisma.category.findFirst({
                where: {
                    slug,
                    NOT: { id },
                },
            });

            if (slugExists) {
                return NextResponse.json(
                    { error: "Category with this name already exists" },
                    { status: 409 }
                );
            }
        }

        const category = await prisma.category.update({
            where: { id },
            data: {
                ...(name && { name, slug }),
                ...(description !== undefined && { description }),
            },
        });

        return NextResponse.json(category);
    } catch (error) {
        console.error("Error updating category:", error);
        return NextResponse.json(
            { error: "Failed to update category" },
            { status: 500 }
        );
    }
}

// DELETE /api/admin/categories/[id] - Delete category
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const category = await prisma.category.findUnique({
            where: { id },
        });

        if (!category) {
            return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }

        // Check if any products are using this category
        const productsUsingCategory = await prisma.product.count({
            where: { category: category.slug },
        });

        if (productsUsingCategory > 0) {
            return NextResponse.json(
                {
                    error: `Cannot delete category. ${productsUsingCategory} product(s) are using this category.`,
                },
                { status: 409 }
            );
        }

        await prisma.category.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Category deleted successfully" });
    } catch (error) {
        console.error("Error deleting category:", error);
        return NextResponse.json(
            { error: "Failed to delete category" },
            { status: 500 }
        );
    }
}
