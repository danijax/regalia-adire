import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";

const prisma = new PrismaClient();

async function testAuth() {
    console.log("Testing authentication...\n");

    // Check if admin user exists
    const admin = await prisma.admin.findUnique({
        where: { email: "admin@adirebyregalia.com" },
    });

    if (!admin) {
        console.log("❌ Admin user not found in database!");
        return;
    }

    console.log("✓ Admin user found:");
    console.log("  Email:", admin.email);
    console.log("  Name:", admin.name);
    console.log("  Role:", admin.role);
    console.log("  Password hash length:", admin.password.length);
    console.log("  Password hash starts with:", admin.password.substring(0, 7));

    // Test password
    const testPassword = "ChangeThisPassword123!";
    const isValid = await compare(testPassword, admin.password);

    console.log("\n Testing password:", testPassword);
    console.log("  Password valid:", isValid ? "✓ YES" : "❌ NO");

    await prisma.$disconnect();
}

testAuth();
