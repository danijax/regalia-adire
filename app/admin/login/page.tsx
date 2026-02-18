import { Suspense } from "react";
import AdminLoginForm from "./AdminLoginForm";

export default function AdminLoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
                <p className="text-muted-foreground">Loading...</p>
            </div>
        }>
            <AdminLoginForm />
        </Suspense>
    );
}
