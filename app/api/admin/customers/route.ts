import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET /api/admin/customers - Aggregate customer data from orders
export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const searchParams = request.nextUrl.searchParams;
        const search = searchParams.get("search") || "";

        // Get all orders grouped by customer email
        const orders = await prisma.order.findMany({
            orderBy: { createdAt: "desc" },
        });

        // Aggregate customer data from orders
        const customerMap = new Map<
            string,
            {
                email: string;
                name: string;
                totalOrders: number;
                totalSpent: number;
                lastOrderDate: string;
                statuses: string[];
            }
        >();

        for (const order of orders) {
            const email = order.customerEmail.toLowerCase();
            const existing = customerMap.get(email);

            if (existing) {
                existing.totalOrders += 1;
                existing.totalSpent += order.total;
                existing.statuses.push(order.status);
                // Keep the most recent name
                if (new Date(order.createdAt) > new Date(existing.lastOrderDate)) {
                    existing.name = order.customerName;
                    existing.lastOrderDate = order.createdAt.toISOString();
                }
            } else {
                customerMap.set(email, {
                    email: order.customerEmail,
                    name: order.customerName,
                    totalOrders: 1,
                    totalSpent: order.total,
                    lastOrderDate: order.createdAt.toISOString(),
                    statuses: [order.status],
                });
            }
        }

        let customers = Array.from(customerMap.values())
            .sort((a, b) => new Date(b.lastOrderDate).getTime() - new Date(a.lastOrderDate).getTime());

        // Apply search filter
        if (search) {
            const searchLower = search.toLowerCase();
            customers = customers.filter(
                (c) =>
                    c.name.toLowerCase().includes(searchLower) ||
                    c.email.toLowerCase().includes(searchLower)
            );
        }

        // Summary stats
        const summary = {
            totalCustomers: customers.length,
            totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
            averageOrderValue:
                customers.length > 0
                    ? customers.reduce((sum, c) => sum + c.totalSpent, 0) /
                    orders.length
                    : 0,
            repeatCustomers: customers.filter((c) => c.totalOrders > 1).length,
        };

        return NextResponse.json({ customers, summary });
    } catch (error) {
        console.error("Error fetching customers:", error);
        return NextResponse.json(
            { error: "Failed to fetch customers" },
            { status: 500 }
        );
    }
}
