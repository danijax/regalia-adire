import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET /api/admin/analytics/revenue - Revenue chart data
export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Get analytics data for revenue chart
        const analyticsData = await prisma.analytics.findMany({
            orderBy: {
                date: "asc",
            },
            take: 30, // Last 30 days
        });

        const revenueData = analyticsData.map((item) => ({
            date: item.date.toISOString().split("T")[0],
            revenue: item.revenue,
        }));

        return NextResponse.json(revenueData);
    } catch (error) {
        console.error("Error fetching revenue data:", error);
        return NextResponse.json(
            { error: "Failed to fetch revenue data" },
            { status: 500 }
        );
    }
}
