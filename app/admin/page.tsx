import { StatsCard } from "@/components/admin/StatsCard";
import { RevenueChart } from "@/components/admin/RevenueChart";
import {
    DollarSign,
    ShoppingCart,
    TrendingUp,
    Package,
} from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

function getStatusBadge(status: string) {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
        Delivered: "default",
        delivered: "default",
        Processing: "secondary",
        processing: "secondary",
        Shipped: "outline",
        shipped: "outline",
        Pending: "destructive",
        pending: "destructive",
    };

    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
}

export default async function AdminDashboard() {
    // Fetch real stats from DB
    const [orderAggregates, totalProducts, recentOrders, allOrders] = await Promise.all([
        prisma.order.aggregate({
            _sum: { total: true },
            _count: true,
            _avg: { total: true },
        }),
        prisma.product.count(),
        prisma.order.findMany({
            orderBy: { createdAt: "desc" },
            take: 5,
        }),
        prisma.order.findMany({
            orderBy: { createdAt: "desc" },
            take: 50,
            select: { items: true, createdAt: true, total: true },
        }),
    ]);

    const totalRevenue = orderAggregates._sum.total || 0;
    const totalOrders = orderAggregates._count || 0;
    const averageOrderValue = Math.round(orderAggregates._avg.total || 0);

    // Build revenue chart data from last 7 weeks of orders
    const revenueByWeek: { date: string; revenue: number }[] = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - i * 7);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 7);

        const weekRevenue = allOrders
            .filter(
                (o) =>
                    new Date(o.createdAt) >= weekStart &&
                    new Date(o.createdAt) < weekEnd
            )
            .reduce((sum, o) => sum + o.total, 0);

        revenueByWeek.push({
            date: weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
            revenue: weekRevenue,
        });
    }

    // Aggregate top products from order items
    const productSales = new Map<string, { name: string; sales: number; revenue: number }>();
    for (const order of allOrders) {
        try {
            const items = typeof order.items === "string" ? JSON.parse(order.items) : order.items;
            if (Array.isArray(items)) {
                for (const item of items) {
                    const name = item.name || "Unknown Product";
                    const existing = productSales.get(name) || { name, sales: 0, revenue: 0 };
                    existing.sales += item.quantity || 1;
                    existing.revenue += (item.price || 0) * (item.quantity || 1);
                    productSales.set(name, existing);
                }
            }
        } catch {
            // Skip unparseable items
        }
    }
    const topProducts = Array.from(productSales.values())
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 4);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-serif font-bold text-primary">
                    Dashboard
                </h1>
                <p className="text-muted-foreground">
                    Welcome back! Here&apos;s what&apos;s happening with your store.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Total Revenue"
                    value={`₦${totalRevenue.toLocaleString()}`}
                    change={`${totalOrders} orders total`}
                    changeType="positive"
                    icon={DollarSign}
                />
                <StatsCard
                    title="Total Orders"
                    value={totalOrders}
                    change={`${totalProducts} products listed`}
                    changeType="positive"
                    icon={ShoppingCart}
                />
                <StatsCard
                    title="Average Order Value"
                    value={`₦${averageOrderValue.toLocaleString()}`}
                    change="Per order average"
                    changeType="positive"
                    icon={TrendingUp}
                />
                <StatsCard
                    title="Total Products"
                    value={totalProducts}
                    change="Active listings"
                    changeType="positive"
                    icon={Package}
                />
            </div>

            {/* Charts Row */}
            <div className="grid gap-4 md:grid-cols-2">
                <RevenueChart data={revenueByWeek} />

                {/* Top Products */}
                <Card>
                    <CardHeader>
                        <CardTitle>Top Products</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {topProducts.length > 0 ? (
                                topProducts.map((product, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between pb-3 border-b last:border-0"
                                    >
                                        <div className="space-y-1">
                                            <p className="font-medium text-sm">{product.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {product.sales} sold
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-sm">
                                                ₦{product.revenue.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-muted-foreground">No sales data yet</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Orders */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                    {recentOrders.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Order ID</TableHead>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentOrders.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell className="font-medium font-mono text-xs">
                                            {order.id.slice(0, 8)}...
                                        </TableCell>
                                        <TableCell>{order.customerName}</TableCell>
                                        <TableCell>₦{order.total.toLocaleString()}</TableCell>
                                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                                        <TableCell>
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <p className="text-sm text-muted-foreground py-4">No orders yet</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

