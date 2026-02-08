"use client";

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

// Sample data - will be replaced with real data from database
const stats = {
    totalRevenue: 487250,
    revenueChange: "+12.5% from last month",
    totalOrders: 142,
    ordersChange: "+8.3% from last month",
    averageOrderValue: 3431,
    avgChange: "+3.2% from last month",
    conversionRate: 3.2,
    conversionChange: "+0.5% from last month",
};

const revenueData = [
    { date: "Jan 1", revenue: 35000 },
    { date: "Jan 8", revenue: 42000 },
    { date: "Jan 15", revenue: 38000 },
    { date: "Jan 22", revenue: 51000 },
    { date: "Jan 29", revenue: 47000 },
    { date: "Feb 5", revenue: 53000 },
    { date: "Feb 12", revenue: 61000 },
];

const recentOrders = [
    {
        id: "ORD-001",
        customer: "Amina Johnson",
        amount: 25000,
        status: "Delivered",
        date: "2026-02-03",
    },
    {
        id: "ORD-002",
        customer: "Chidi Okonkwo",
        amount: 18500,
        status: "Processing",
        date: "2026-02-03",
    },
    {
        id: "ORD-003",
        customer: "Fatima Abdul",
        amount: 12000,
        status: "Pending",
        date: "2026-02-02",
    },
    {
        id: "ORD-004",
        customer: "Tunde Bakare",
        amount: 22000,
        status: "Shipped",
        date: "2026-02-02",
    },
    {
        id: "ORD-005",
        customer: "Ngozi Eze",
        amount: 14500,
        status: "Delivered",
        date: "2026-02-01",
    },
];

const topProducts = [
    { name: "Indigo Flow Maxi Dress", sales: 45, revenue: 832500 },
    { name: "Heritage Kaftan", sales: 32, revenue: 800000 },
    { name: "Golden Sunset Dress", sales: 28, revenue: 616000 },
    { name: "Terracotta Elegance Top", sales: 37, revenue: 444000 },
];

function getStatusBadge(status: string) {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
        Delivered: "default",
        Processing: "secondary",
        Shipped: "outline",
        Pending: "destructive",
    };

    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
}

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-serif font-bold text-primary">
                    Dashboard
                </h1>
                <p className="text-muted-foreground">
                    Welcome back! Here's what's happening with your store.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Total Revenue"
                    value={`₦${stats.totalRevenue.toLocaleString()}`}
                    change={stats.revenueChange}
                    changeType="positive"
                    icon={DollarSign}
                />
                <StatsCard
                    title="Total Orders"
                    value={stats.totalOrders}
                    change={stats.ordersChange}
                    changeType="positive"
                    icon={ShoppingCart}
                />
                <StatsCard
                    title="Average Order Value"
                    value={`₦${stats.averageOrderValue.toLocaleString()}`}
                    change={stats.avgChange}
                    changeType="positive"
                    icon={TrendingUp}
                />
                <StatsCard
                    title="Conversion Rate"
                    value={`${stats.conversionRate}%`}
                    change={stats.conversionChange}
                    changeType="positive"
                    icon={Package}
                />
            </div>

            {/* Charts Row */}
            <div className="grid gap-4 md:grid-cols-2">
                <RevenueChart data={revenueData} />

                {/* Top Products */}
                <Card>
                    <CardHeader>
                        <CardTitle>Top Products</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {topProducts.map((product, index) => (
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
                            ))}
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
                                    <TableCell className="font-medium">{order.id}</TableCell>
                                    <TableCell>{order.customer}</TableCell>
                                    <TableCell>₦{order.amount.toLocaleString()}</TableCell>
                                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                                    <TableCell>{order.date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
