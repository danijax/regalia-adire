"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { StatsCard } from "@/components/admin/StatsCard";
import {
    Loader2,
    Users,
    DollarSign,
    ShoppingCart,
    UserCheck,
    Search,
    Eye,
    Mail,
} from "lucide-react";
import { toast } from "sonner";

interface Customer {
    email: string;
    name: string;
    totalOrders: number;
    totalSpent: number;
    lastOrderDate: string;
    statuses: string[];
}

interface CustomerSummary {
    totalCustomers: number;
    totalRevenue: number;
    averageOrderValue: number;
    repeatCustomers: number;
}

interface CustomerOrder {
    id: string;
    orderNumber: string;
    total: number;
    status: string;
    createdAt: string;
    items: { name: string; quantity: number }[];
}

function getStatusBadge(status: string) {
    const variants: Record<
        string,
        "default" | "secondary" | "destructive" | "outline"
    > = {
        delivered: "default",
        paid: "default",
        processing: "secondary",
        shipped: "outline",
        pending: "destructive",
        cancelled: "destructive",
    };

    return (
        <Badge variant={variants[status.toLowerCase()] || "default"}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
    );
}

export default function AdminCustomersPage() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [summary, setSummary] = useState<CustomerSummary | null>(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [customerOrders, setCustomerOrders] = useState<CustomerOrder[]>([]);
    const [loadingOrders, setLoadingOrders] = useState(false);

    const fetchCustomers = async (search?: string) => {
        try {
            setLoading(true);
            const url = search
                ? `/api/admin/customers?search=${encodeURIComponent(search)}`
                : `/api/admin/customers`;
            const res = await fetch(url);
            if (!res.ok) throw new Error("Failed to fetch customers");
            const data = await res.json();
            setCustomers(data.customers);
            setSummary(data.summary);
        } catch (error) {
            console.error("Error fetching customers:", error);
            toast.error("Failed to load customers");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    // Debounced search
    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchCustomers(searchQuery);
        }, 300);
        return () => clearTimeout(timeout);
    }, [searchQuery]);

    const handleViewCustomer = async (customer: Customer) => {
        setSelectedCustomer(customer);
        setLoadingOrders(true);
        try {
            // Fetch all orders and filter by customer email client-side
            const res = await fetch(`/api/admin/orders`);
            if (!res.ok) throw new Error("Failed to fetch orders");
            const allOrders = await res.json();
            const filtered = allOrders.filter(
                (o: CustomerOrder & { customerEmail: string }) =>
                    o.customerEmail?.toLowerCase() === customer.email.toLowerCase()
            );
            setCustomerOrders(filtered);
        } catch (error) {
            console.error("Error fetching customer orders:", error);
            toast.error("Failed to load customer orders");
        } finally {
            setLoadingOrders(false);
        }
    };

    const formatPrice = (amount: number) => `₦${amount.toLocaleString()}`;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-serif font-bold text-primary">Customers</h1>
                <p className="text-muted-foreground">
                    View and manage your customer base
                </p>
            </div>

            {/* Stats Cards */}
            {summary && (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatsCard
                        title="Total Customers"
                        value={summary.totalCustomers}
                        change=""
                        changeType="positive"
                        icon={Users}
                    />
                    <StatsCard
                        title="Total Revenue"
                        value={formatPrice(summary.totalRevenue)}
                        change=""
                        changeType="positive"
                        icon={DollarSign}
                    />
                    <StatsCard
                        title="Avg. Order Value"
                        value={formatPrice(Math.round(summary.averageOrderValue))}
                        change=""
                        changeType="positive"
                        icon={ShoppingCart}
                    />
                    <StatsCard
                        title="Repeat Customers"
                        value={summary.repeatCustomers}
                        change=""
                        changeType="positive"
                        icon={UserCheck}
                    />
                </div>
            )}

            {/* Search + Table */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>
                            {loading
                                ? "Loading customers..."
                                : `All Customers (${customers.length})`}
                        </CardTitle>
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by name or email..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9"
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : customers.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                            <Users className="h-12 w-12 mb-4" />
                            <p className="text-lg font-medium">No customers found</p>
                            <p className="text-sm">
                                {searchQuery
                                    ? "No customers match your search. Try a different term."
                                    : "Customers will appear here once they place orders."}
                            </p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Orders</TableHead>
                                    <TableHead>Total Spent</TableHead>
                                    <TableHead>Last Order</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {customers.map((customer) => (
                                    <TableRow key={customer.email}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                                                    {customer.name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")
                                                        .toUpperCase()
                                                        .slice(0, 2)}
                                                </div>
                                                <div>
                                                    <p className="font-medium">{customer.name}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {customer.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="font-medium">{customer.totalOrders}</span>
                                            <span className="text-muted-foreground text-sm">
                                                {" "}order{customer.totalOrders !== 1 ? "s" : ""}
                                            </span>
                                        </TableCell>
                                        <TableCell className="font-semibold">
                                            {formatPrice(customer.totalSpent)}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(customer.lastOrderDate).toLocaleDateString(
                                                "en-NG",
                                                {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                }
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {customer.totalOrders > 1 ? (
                                                <Badge variant="default">Repeat</Badge>
                                            ) : (
                                                <Badge variant="outline">New</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleViewCustomer(customer)}
                                            >
                                                <Eye className="h-4 w-4 mr-1" />
                                                View
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            {/* Customer Detail Dialog */}
            <Dialog
                open={!!selectedCustomer}
                onOpenChange={() => {
                    setSelectedCustomer(null);
                    setCustomerOrders([]);
                }}
            >
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="font-serif">Customer Details</DialogTitle>
                    </DialogHeader>
                    {selectedCustomer && (
                        <div className="space-y-6">
                            {/* Customer Profile */}
                            <div className="flex items-center gap-4">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xl">
                                    {selectedCustomer.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")
                                        .toUpperCase()
                                        .slice(0, 2)}
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        {selectedCustomer.name}
                                    </h3>
                                    <p className="text-muted-foreground flex items-center gap-1">
                                        <Mail className="h-4 w-4" />
                                        {selectedCustomer.email}
                                    </p>
                                </div>
                            </div>

                            {/* Customer Stats */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-muted/50 p-4 rounded-lg text-center">
                                    <p className="text-2xl font-bold">
                                        {selectedCustomer.totalOrders}
                                    </p>
                                    <p className="text-sm text-muted-foreground">Orders</p>
                                </div>
                                <div className="bg-muted/50 p-4 rounded-lg text-center">
                                    <p className="text-2xl font-bold">
                                        {formatPrice(selectedCustomer.totalSpent)}
                                    </p>
                                    <p className="text-sm text-muted-foreground">Total Spent</p>
                                </div>
                                <div className="bg-muted/50 p-4 rounded-lg text-center">
                                    <p className="text-2xl font-bold">
                                        {formatPrice(
                                            Math.round(
                                                selectedCustomer.totalSpent /
                                                selectedCustomer.totalOrders
                                            )
                                        )}
                                    </p>
                                    <p className="text-sm text-muted-foreground">Avg. Order</p>
                                </div>
                            </div>

                            {/* Order History */}
                            <div>
                                <h3 className="font-semibold mb-3">Order History</h3>
                                {loadingOrders ? (
                                    <div className="flex items-center justify-center py-8">
                                        <Loader2 className="h-6 w-6 animate-spin text-primary" />
                                    </div>
                                ) : customerOrders.length === 0 ? (
                                    <p className="text-sm text-muted-foreground text-center py-4">
                                        No orders found.
                                    </p>
                                ) : (
                                    <div className="space-y-3">
                                        {customerOrders.map((order) => (
                                            <div
                                                key={order.id}
                                                className="flex items-center justify-between bg-muted/50 p-4 rounded-lg"
                                            >
                                                <div>
                                                    <p className="font-medium font-mono text-sm">
                                                        {order.orderNumber}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {new Date(order.createdAt).toLocaleDateString(
                                                            "en-NG",
                                                            {
                                                                year: "numeric",
                                                                month: "short",
                                                                day: "numeric",
                                                            }
                                                        )}
                                                        {" · "}
                                                        {Array.isArray(order.items)
                                                            ? `${order.items.length} item(s)`
                                                            : ""}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    {getStatusBadge(order.status)}
                                                    <span className="font-semibold">
                                                        {formatPrice(order.total)}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
