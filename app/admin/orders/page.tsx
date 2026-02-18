"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Package, Eye, ChevronDown } from "lucide-react";
import { toast } from "sonner";

interface Order {
    id: string;
    orderNumber: string;
    customerEmail: string;
    customerName: string;
    shippingAddress: {
        address: string;
        city: string;
        state: string;
        country: string;
    };
    items: {
        id: string;
        name: string;
        price: number;
        quantity: number;
        size?: string;
        color?: string;
        image?: string;
    }[];
    subtotal: number;
    shipping: number;
    total: number;
    status: string;
    paymentId: string | null;
    createdAt: string;
    updatedAt: string;
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

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

    const fetchOrders = async (status?: string) => {
        try {
            setLoading(true);
            const url =
                status && status !== "all"
                    ? `/api/admin/orders?status=${status}`
                    : `/api/admin/orders`;
            const res = await fetch(url);
            if (!res.ok) throw new Error("Failed to fetch orders");
            const data = await res.json();
            setOrders(data);
        } catch (error) {
            console.error("Error fetching orders:", error);
            toast.error("Failed to load orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders(statusFilter);
    }, [statusFilter]);

    const handleStatusChange = async (orderId: string, newStatus: string) => {
        try {
            setUpdatingStatus(orderId);
            const res = await fetch(`/api/admin/orders/${orderId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });
            if (!res.ok) throw new Error("Failed to update order");
            toast.success(`Order status updated to ${newStatus}`);
            await fetchOrders(statusFilter);
        } catch (error) {
            console.error("Error updating order status:", error);
            toast.error("Failed to update order status");
        } finally {
            setUpdatingStatus(null);
        }
    };

    const formatPrice = (amount: number) => {
        return `₦${amount.toLocaleString()}`;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-primary">Orders</h1>
                    <p className="text-muted-foreground">
                        Manage and track customer orders
                    </p>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Orders</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Orders Table */}
            <Card>
                <CardHeader>
                    <CardTitle>
                        {loading ? "Loading orders..." : `All Orders (${orders.length})`}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                            <Package className="h-12 w-12 mb-4" />
                            <p className="text-lg font-medium">No orders found</p>
                            <p className="text-sm">
                                {statusFilter !== "all"
                                    ? `No ${statusFilter} orders. Try a different filter.`
                                    : "Orders will appear here when customers place them."}
                            </p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Order Number</TableHead>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Items</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orders.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell className="font-medium font-mono">
                                            {order.orderNumber}
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <p className="font-medium">{order.customerName}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {order.customerEmail}
                                                </p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {Array.isArray(order.items) ? order.items.length : 0} item(s)
                                        </TableCell>
                                        <TableCell className="font-semibold">
                                            {formatPrice(order.total)}
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-auto p-1 gap-1"
                                                        disabled={updatingStatus === order.id}
                                                    >
                                                        {updatingStatus === order.id ? (
                                                            <Loader2 className="h-4 w-4 animate-spin" />
                                                        ) : (
                                                            <>
                                                                {getStatusBadge(order.status)}
                                                                <ChevronDown className="h-3 w-3 text-muted-foreground" />
                                                            </>
                                                        )}
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="start">
                                                    {["pending", "paid", "processing", "shipped", "delivered", "cancelled"].map((s) => (
                                                        <DropdownMenuItem
                                                            key={s}
                                                            onClick={() => handleStatusChange(order.id, s)}
                                                            disabled={order.status === s}
                                                        >
                                                            {getStatusBadge(s)}
                                                        </DropdownMenuItem>
                                                    ))}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                        <TableCell>
                                            {new Date(order.createdAt).toLocaleDateString("en-NG", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setSelectedOrder(order)}
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

            {/* Order Detail Dialog */}
            <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="font-serif">
                            Order {selectedOrder?.orderNumber}
                        </DialogTitle>
                    </DialogHeader>
                    {selectedOrder && (
                        <div className="space-y-6">
                            {/* Customer Info */}
                            <div>
                                <h3 className="font-semibold mb-2">Customer Information</h3>
                                <div className="bg-muted/50 p-4 rounded-lg space-y-1 text-sm">
                                    <p><span className="text-muted-foreground">Name:</span> {selectedOrder.customerName}</p>
                                    <p><span className="text-muted-foreground">Email:</span> {selectedOrder.customerEmail}</p>
                                    {selectedOrder.shippingAddress && (
                                        <p>
                                            <span className="text-muted-foreground">Address:</span>{" "}
                                            {typeof selectedOrder.shippingAddress === "object"
                                                ? [
                                                    selectedOrder.shippingAddress.address,
                                                    selectedOrder.shippingAddress.city,
                                                    selectedOrder.shippingAddress.state,
                                                    selectedOrder.shippingAddress.country,
                                                ]
                                                    .filter(Boolean)
                                                    .join(", ")
                                                : String(selectedOrder.shippingAddress)}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Order Items */}
                            <div>
                                <h3 className="font-semibold mb-2">Order Items</h3>
                                <div className="space-y-3">
                                    {Array.isArray(selectedOrder.items) &&
                                        selectedOrder.items.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between bg-muted/50 p-3 rounded-lg"
                                            >
                                                <div>
                                                    <p className="font-medium">{item.name}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Qty: {item.quantity}
                                                        {item.size && ` · Size: ${item.size}`}
                                                        {item.color && ` · Color: ${item.color}`}
                                                    </p>
                                                </div>
                                                <p className="font-semibold">
                                                    {formatPrice(item.price * item.quantity)}
                                                </p>
                                            </div>
                                        ))}
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div>
                                <h3 className="font-semibold mb-2">Order Summary</h3>
                                <div className="bg-muted/50 p-4 rounded-lg space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span>{formatPrice(selectedOrder.subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Shipping</span>
                                        <span>
                                            {selectedOrder.shipping === 0
                                                ? "Free"
                                                : formatPrice(selectedOrder.shipping)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between font-semibold border-t pt-2">
                                        <span>Total</span>
                                        <span>{formatPrice(selectedOrder.total)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Meta Info */}
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <span>
                                    Status: {getStatusBadge(selectedOrder.status)}
                                </span>
                                <span>
                                    {selectedOrder.paymentId && `Payment: ${selectedOrder.paymentId}`}
                                </span>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
