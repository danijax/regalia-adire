import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// GET /api/products - Public endpoint to list products
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const featured = searchParams.get("featured");
        const category = searchParams.get("category");
        const search = searchParams.get("search");
        const minPrice = searchParams.get("minPrice");
        const maxPrice = searchParams.get("maxPrice");
        const size = searchParams.get("size");
        const color = searchParams.get("color");
        const sort = searchParams.get("sort");

        const where: Prisma.ProductWhereInput = {};

        if (featured === "true") {
            where.featured = true;
        }
        if (category) {
            where.category = category;
        }
        if (search) {
            where.OR = [
                { name: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
            ];
        }
        if (minPrice) {
            where.price = { ...((where.price as object) || {}), gte: parseFloat(minPrice) };
        }
        if (maxPrice) {
            where.price = { ...((where.price as object) || {}), lte: parseFloat(maxPrice) };
        }
        if (size) {
            where.sizes = { has: size };
        }
        if (color) {
            where.colors = { has: color };
        }

        // Determine sort order
        let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: "desc" };
        switch (sort) {
            case "price-asc":
                orderBy = { price: "asc" };
                break;
            case "price-desc":
                orderBy = { price: "desc" };
                break;
            case "name-asc":
                orderBy = { name: "asc" };
                break;
            case "name-desc":
                orderBy = { name: "desc" };
                break;
            case "newest":
            default:
                orderBy = { createdAt: "desc" };
                break;
        }

        const products = await prisma.product.findMany({
            where,
            orderBy,
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
