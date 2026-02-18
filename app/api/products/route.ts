import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/products - Public endpoint to list products
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const featured = searchParams.get("featured");
        const category = searchParams.get("category");

        const where: Record<string, unknown> = {};

        if (featured === "true") {
            where.featured = true;
        }
        if (category) {
            where.category = category;
        }

        const products = await prisma.product.findMany({
            where,
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json(
            { error: "Failed to fetch products" },
            { status: 500 }
        );
    }
}
