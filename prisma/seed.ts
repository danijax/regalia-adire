import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    console.log("Starting database seed...");

    // Create admin user
    const adminPassword = await hash("ChangeThisPassword123!", 10);
    const admin = await prisma.admin.upsert({
        where: { email: "admin@adirebyregalia.com" },
        update: {},
        create: {
            email: "admin@adirebyregalia.com",
            password: adminPassword,
            name: "Admin User",
            role: "admin",
        },
    });
    console.log("✓ Created admin user:", admin.email);

    // Create categories
    const categories = [
        {
            name: "Dress",
            slug: "dress",
            description: "Elegant Adire dresses for all occasions",
        },
        {
            name: "Top",
            slug: "top",
            description: "Stylish Adire tops and blouses",
        },
        {
            name: "Skirt",
            slug: "skirt",
            description: "Traditional and modern Adire skirts",
        },
        {
            name: "Kaftan",
            slug: "kaftan",
            description: "Luxurious Adire kaftans",
        },
        {
            name: "Accessories",
            slug: "accessories",
            description: "Adire accessories and complementary items",
        },
    ];

    for (const category of categories) {
        await prisma.category.upsert({
            where: { slug: category.slug },
            update: {},
            create: category,
        });
    }
    console.log(`✓ Created ${categories.length} categories`);

    // Create sample products
    const products = [
        {
            name: "Indigo Flow Maxi Dress",
            slug: "indigo-flow-maxi-dress",
            description:
                "Elegant maxi dress featuring traditional Adire indigo patterns. Handcrafted by Nigerian artisans using time-honored tie-dye techniques.",
            price: 18500,
            images: [
                "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800",
                "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800",
            ],
            category: "dress",
            sizes: ["XS", "S", "M", "L", "XL"],
            colors: ["Indigo", "White"],
            stock: 45,
            featured: true,
        },
        {
            name: "Terracotta Elegance Top",
            slug: "terracotta-elegance-top",
            description:
                "Elegant terracotta-dyed top with intricate Adire patterns. Perfect for both casual and formal occasions.",
            price: 12000,
            images: [
                "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800",
            ],
            category: "top",
            sizes: ["S", "M", "L", "XL"],
            colors: ["Terracotta", "Cream"],
            stock: 37,
            featured: true,
        },
        {
            name: "Heritage Kaftan",
            slug: "heritage-kaftan",
            description:
                "Luxurious kaftan showcasing authentic Adire craftsmanship. A statement piece celebrating Nigerian textile artistry.",
            price: 25000,
            images: [
                "https://images.unsplash.com/photo-1583391733981-5aded2fd90ab?w=800",
            ],
            category: "kaftan",
            sizes: ["One Size"],
            colors: ["Cream", "Gold"],
            stock: 32,
            featured: true,
        },
        {
            name: "Contemporary Adire Skirt",
            slug: "contemporary-adire-skirt",
            description:
                "Modern interpretation of classic Adire patterns in a flowing skirt design.",
            price: 14500,
            images: [
                "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800",
            ],
            category: "skirt",
            sizes: ["XS", "S", "M", "L"],
            colors: ["Indigo", "Terracotta"],
            stock: 28,
            featured: false,
        },
        {
            name: "Artisan Wrap Top",
            slug: "artisan-wrap-top",
            description:
                "Versatile wrap top featuring hand-dyed Adire patterns. Crafted with 100% organic cotton.",
            price: 11000,
            images: [
                "https://images.unsplash.com/photo-1564859228273-274232fdb516?w=800",
            ],
            category: "top",
            sizes: ["S", "M", "L"],
            colors: ["Indigo", "White"],
            stock: 22,
            featured: false,
        },
        {
            name: "Golden Sunset Dress",
            slug: "golden-sunset-dress",
            description:
                "Stunning dress with golden Adire accents. Perfect for special occasions.",
            price: 22000,
            images: [
                "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800",
            ],
            category: "dress",
            sizes: ["XS", "S", "M", "L", "XL"],
            colors: ["Gold", "Cream"],
            stock: 18,
            featured: true,
        },
    ];

    for (const product of products) {
        await prisma.product.upsert({
            where: { slug: product.slug },
            update: {},
            create: product,
        });
    }
    console.log(`✓ Created ${products.length} products`);

    // Create sample orders
    const orders = [
        {
            orderNumber: "ADR-2026-001",
            customerEmail: "amina.j@email.com",
            customerName: "Amina Johnson",
            shippingAddress: {
                street: "123 Lagos Street",
                city: "Lagos",
                state: "Lagos State",
                country: "Nigeria",
                postalCode: "100001",
            },
            items: [
                {
                    productId: "indigo-flow-maxi-dress",
                    name: "Indigo Flow Maxi Dress",
                    price: 18500,
                    quantity: 1,
                    size: "M",
                },
            ],
            subtotal: 18500,
            shipping: 0,
            total: 18500,
            status: "delivered",
        },
        {
            orderNumber: "ADR-2026-002",
            customerEmail: "chidi.o@email.com",
            customerName: "Chidi Okonkwo",
            shippingAddress: {
                street: "456 Abuja Road",
                city: "Abuja",
                state: "FCT",
                country: "Nigeria",
                postalCode: "900001",
            },
            items: [
                {
                    productId: "heritage-kaftan",
                    name: "Heritage Kaftan",
                    price: 25000,
                    quantity: 1,
                    size: "One Size",
                },
            ],
            subtotal: 25000,
            shipping: 0,
            total: 25000,
            status: "processing",
        },
        {
            orderNumber: "ADR-2026-003",
            customerEmail: "fatima.a@email.com",
            customerName: "Fatima Abdul",
            shippingAddress: {
                street: "789 Kano Avenue",
                city: "Kano",
                state: "Kano State",
                country: "Nigeria",
                postalCode: "700001",
            },
            items: [
                {
                    productId: "terracotta-elegance-top",
                    name: "Terracotta Elegance Top",
                    price: 12000,
                    quantity: 1,
                    size: "L",
                },
            ],
            subtotal: 12000,
            shipping: 0,
            total: 12000,
            status: "pending",
        },
    ];

    for (const order of orders) {
        await prisma.order.upsert({
            where: { orderNumber: order.orderNumber },
            update: {},
            create: order,
        });
    }
    console.log(`✓ Created ${orders.length} orders`);

    // Create sample analytics data (last 7 days)
    const today = new Date();
    const analyticsData = [
        { date: new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000), revenue: 35000, orders: 3, visitors: 120 },
        { date: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000), revenue: 42000, orders: 4, visitors: 145 },
        { date: new Date(today.getTime() - 4 * 24 * 60 * 60 * 1000), revenue: 38000, orders: 3, visitors: 132 },
        { date: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000), revenue: 51000, orders: 5, visitors: 168 },
        { date: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000), revenue: 47000, orders: 4, visitors: 151 },
        { date: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000), revenue: 53000, orders: 5, visitors: 178 },
        { date: today, revenue: 61000, orders: 6, visitors: 195 },
    ];

    for (const data of analyticsData) {
        await prisma.analytics.upsert({
            where: { date: data.date },
            update: {},
            create: data,
        });
    }
    console.log(`✓ Created ${analyticsData.length} analytics records`);

    console.log("\n✓ Database seeded successfully!");
}

main()
    .catch((e) => {
        console.error("Error seeding database:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
