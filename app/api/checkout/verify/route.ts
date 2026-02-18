import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/checkout/verify - Paystack callback verification
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const reference = searchParams.get("reference") || searchParams.get("trxref");

        if (!reference) {
            return NextResponse.redirect(
                new URL("/cart?error=missing_reference", request.url)
            );
        }

        const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;

        if (!paystackSecretKey) {
            // Dev mode — just find the order and redirect
            const order = await prisma.order.findFirst({
                where: { orderNumber: reference },
            });

            if (order) {
                await prisma.order.update({
                    where: { id: order.id },
                    data: { status: "paid" },
                });
                return NextResponse.redirect(
                    new URL(`/order-confirmation/${order.id}`, request.url)
                );
            }

            return NextResponse.redirect(
                new URL("/cart?error=order_not_found", request.url)
            );
        }

        // Verify transaction with Paystack
        const verifyResponse = await fetch(
            `https://api.paystack.co/transaction/verify/${reference}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${paystackSecretKey}`,
                },
            }
        );

        const verifyData = await verifyResponse.json();

        if (verifyData.status && verifyData.data.status === "success") {
            // Payment successful — update order
            const order = await prisma.order.findFirst({
                where: { orderNumber: reference },
            });

            if (order) {
                await prisma.order.update({
                    where: { id: order.id },
                    data: {
                        status: "paid",
                        paymentId: verifyData.data.reference,
                    },
                });

                // Update analytics
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                await prisma.analytics.upsert({
                    where: { date: today },
                    update: {
                        revenue: { increment: order.total },
                        orders: { increment: 1 },
                    },
                    create: {
                        date: today,
                        revenue: order.total,
                        orders: 1,
                        visitors: 0,
                    },
                });

                return NextResponse.redirect(
                    new URL(`/order-confirmation/${order.id}`, request.url)
                );
            }
        }

        // Payment failed or order not found
        return NextResponse.redirect(
            new URL("/cart?error=payment_failed", request.url)
        );
    } catch (error) {
        console.error("Payment verification error:", error);
        return NextResponse.redirect(
            new URL("/cart?error=verification_failed", request.url)
        );
    }
}
