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

// Sample orders data
const orders = [
    {
        id: "ORD-001",
        orderNumber: "ADR-2026-001",
        customer: "Amina Johnson",
        email: "amina.j@email.com",
        amount: 25000,
        status: "Delivered",
        date: "2026-02-03T10:30:00",
    },
    {
        id: "ORD-002",
        orderNumber: "ADR-2026-002",
        customer: "Chidi Okonkwo",
        email: "chidi.o@email.com",
        amount: 18500,
        status: "Processing",
        date: "2026-02-03T09:15:00",
    },
    {
        id: "ORD-003",
        orderNumber: "ADR-2026-003",
        customer: "Fatima Abdul",
        email: "fatima.a@email.com",
        amount: 12000,
        status: "Pending",
        date: "2026-02-02T14:20:00",
    },
    {
        id: "ORD-004",
        orderNumber: "ADR-2026-004",
        customer: "Tunde Bakare",
        email: "tunde.b@email.com",
        amount: 22000,
        status: "Shipped",
        date: "2026-02-02T11:45:00",
    },
    {
        id: "ORD-005",
        orderNumber: "ADR-2026-005",
        customer: "Ngozi Eze",
        email: "ngozi.e@email.com",
        amount: 14500,
        status: "Delivered",
        date: "2026-02-01T16:00:00",
    },
];

function getStatusBadge(status: string) {
    const variants: Record<
        string,
        "default" | "secondary" | "destructive" | "outline"
    > = {
        Delivered: "default",
        Processing: "secondary",
        Shipped: "outline",
        Pending: "destructive",
    };

    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
}

export default function AdminOrdersPage() {
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
                <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Orders</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Orders Table */}
            <Card>
                <CardHeader>
                    <CardTitle>All Orders ({orders.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order Number</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">
                                        {order.orderNumber}
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <p className="font-medium">{order.customer}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {order.email}
                                            </p>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-semibold">
                                        ₦{order.amount.toLocaleString()}
                                    </TableCell>
                                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                                    <TableCell>
                                        {new Date(order.date).toLocaleDateString("en-NG", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">
                                            View Details
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
