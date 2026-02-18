import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/checkout/initiate - Create order and initiate Paystack payment
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { customer, shippingAddress, items, subtotal, shipping, total } = body;

        // Validate required fields
        if (!customer?.name || !customer?.email || !items?.length) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Generate order number
        const orderCount = await prisma.order.count();
        const orderNumber = `ADR-${new Date().getFullYear()}-${String(orderCount + 1).padStart(4, "0")}`;

        // Create order in database
        const order = await prisma.order.create({
            data: {
                orderNumber,
                customerEmail: customer.email,
                customerName: customer.name,
                shippingAddress,
                items,
                subtotal: parseFloat(subtotal),
                shipping: parseFloat(shipping),
                total: parseFloat(total),
                status: "pending",
            },
        });

        // Try to initialize Paystack payment
        const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;

        if (paystackSecretKey) {
            const paystackResponse = await fetch(
                "https://api.paystack.co/transaction/initialize",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${paystackSecretKey}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: customer.email,
                        amount: Math.round(total * 100), // Paystack expects amount in kobo
                        currency: "NGN",
                        reference: order.orderNumber,
                        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/checkout/verify`,
                        metadata: {
                            orderId: order.id,
                            orderNumber: order.orderNumber,
                            customerName: customer.name,
                            items: items.map((item: { name: string; quantity: number }) => ({
                                name: item.name,
                                quantity: item.quantity,
                            })),
                        },
                    }),
                }
            );

            const paystackData = await paystackResponse.json();

            if (paystackData.status) {
                // Update order with Paystack reference
                await prisma.order.update({
                    where: { id: order.id },
                    data: { paymentId: paystackData.data.reference },
                });

                return NextResponse.json({
                    orderId: order.id,
                    orderNumber: order.orderNumber,
                    authorizationUrl: paystackData.data.authorization_url,
                });
            } else {
                console.error("Paystack error:", paystackData);
                return NextResponse.json(
                    { error: "Payment initialization failed. Please try again." },
                    { status: 500 }
                );
            }
        }

        // Paystack not configured — create order without payment (dev mode)
        console.warn("PAYSTACK_SECRET_KEY not set. Order created without payment.");
        return NextResponse.json({
            orderId: order.id,
            orderNumber: order.orderNumber,
            message: "Order created (payment not configured)",
        });
    } catch (error) {
        console.error("Checkout error:", error);
        return NextResponse.json(
            { error: "Failed to process checkout" },
            { status: 500 }
        );
    }
}
