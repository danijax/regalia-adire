"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Settings,
    LogOut,
    Folder,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
    {
        href: "/admin",
        icon: LayoutDashboard,
        label: "Dashboard",
    },
    {
        href: "/admin/products",
        icon: Package,
        label: "Products",
    },
    {
        href: "/admin/categories",
        icon: Folder,
        label: "Categories",
    },
    {
        href: "/admin/orders",
        icon: ShoppingCart,
        label: "Orders",
    },
    {
        href: "/admin/customers",
        icon: Users,
        label: "Customers",
    },
    {
        href: "/admin/settings",
        icon: Settings,
        label: "Settings",
    },
];

export function AdminSidebar() {
    const pathname = usePathname();

    const handleLogout = async () => {
        await signOut({ callbackUrl: "/admin/login" });
    };

    return (
        <div className="flex h-screen w-64 flex-col border-r bg-muted/30">
            {/* Logo */}
            <div className="flex h-16 items-center border-b px-6">
                <Link href="/admin" className="flex items-center space-x-2">
                    <span className="text-xl font-serif font-bold text-primary">
                        Adire Admin
                    </span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 p-4">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link key={item.href} href={item.href}>
                            <div
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                                    isActive
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                            >
                                <Icon className="h-5 w-5" />
                                <span className="font-medium">{item.label}</span>
                            </div>
                        </Link>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="border-t p-4">
                <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className="w-full justify-start text-muted-foreground hover:text-destructive"
                >
                    <LogOut className="mr-3 h-5 w-5" />
                    Logout
                </Button>
            </div>
        </div>
    );
}
