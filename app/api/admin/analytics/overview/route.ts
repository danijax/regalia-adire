import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET /api/admin/analytics/overview - Dashboard metrics
export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Calculate metrics from orders
        const orders = await prisma.order.findMany();

        const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
        const totalOrders = orders.length;
        const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

        // Get delivered orders for conversion calculation (simplified)
        const deliveredOrders = orders.filter(o => o.status === "delivered").length;
        const conversionRate = totalOrders > 0 ? (deliveredOrders / totalOrders) * 100 : 0;

        // Calculate growth (mock for now - would compare with previous period)
        const metrics = {
            totalRevenue,
            revenueChange: "+12.5% from last month",
            totalOrders,
            ordersChange: "+8.3% from last month",
            averageOrderValue,
            avgChange: "+3.2% from last month",
            conversionRate: parseFloat(conversionRate.toFixed(1)),
            conversionChange: "+0.5% from last month",
        };

        return NextResponse.json(metrics);
    } catch (error) {
        console.error("Error fetching analytics:", error);
        return NextResponse.json(
            { error: "Failed to fetch analytics" },
            { status: 500 }
        );
    }
}
