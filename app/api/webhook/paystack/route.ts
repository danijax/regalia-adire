import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

// POST /api/webhook/paystack - Paystack webhook handler
export async function POST(request: NextRequest) {
    try {
        const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;

        if (!paystackSecretKey) {
            console.error("PAYSTACK_SECRET_KEY not configured");
            return NextResponse.json({ error: "Not configured" }, { status: 500 });
        }

        // Verify webhook signature
        const body = await request.text();
        const signature = request.headers.get("x-paystack-signature");

        const hash = crypto
            .createHmac("sha512", paystackSecretKey)
            .update(body)
            .digest("hex");

        if (hash !== signature) {
            console.error("Invalid Paystack webhook signature");
            return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
        }

        const event = JSON.parse(body);
        console.log("Paystack webhook event:", event.event);

        switch (event.event) {
            case "charge.success": {
                const { reference, amount } = event.data;

                const order = await prisma.order.findFirst({
                    where: { orderNumber: reference },
                });

                if (order && order.status !== "paid") {
                    await prisma.order.update({
                        where: { id: order.id },
                        data: {
                            status: "paid",
                            paymentId: reference,
                        },
                    });

                    // Update analytics
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);

                    await prisma.analytics.upsert({
                        where: { date: today },
                        update: {
                            revenue: { increment: amount / 100 }, // kobo to naira
                            orders: { increment: 1 },
                        },
                        create: {
                            date: today,
                            revenue: amount / 100,
                            orders: 1,
                            visitors: 0,
                        },
                    });

                    console.log(`Order ${reference} marked as paid via webhook`);
                }
                break;
            }

            case "charge.failed": {
                const { reference } = event.data;

                const order = await prisma.order.findFirst({
                    where: { orderNumber: reference },
                });

                if (order) {
                    await prisma.order.update({
                        where: { id: order.id },
                        data: { status: "failed" },
                    });
                    console.log(`Order ${reference} marked as failed via webhook`);
                }
                break;
            }

            default:
                console.log(`Unhandled Paystack event: ${event.event}`);
        }

        // Always return 200 to acknowledge receipt
        return NextResponse.json({ received: true });
    } catch (error) {
        console.error("Webhook error:", error);
        // Still return 200 to prevent Paystack from retrying
        return NextResponse.json({ received: true });
    }
}
