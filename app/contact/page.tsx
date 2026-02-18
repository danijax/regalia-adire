"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (res.ok) {
                toast.success(data.message || "Message sent successfully!");
                setFormData({ name: "", email: "", message: "" });
            } else {
                toast.error(data.error || "Failed to send message");
            }
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <Header />
            <main className="min-h-screen">
                <div className="container mx-auto px-4 py-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4 text-center">
                        Contact Us
                    </h1>
                    <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                        Have a question or need assistance? We'd love to hear from you.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* Contact Form */}
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-2xl font-serif font-bold mb-6">
                                    Send Us a Message
                                </h2>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            value={formData.name}
                                            onChange={(e) =>
                                                setFormData({ ...formData, name: e.target.value })
                                            }
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) =>
                                                setFormData({ ...formData, email: e.target.value })
                                            }
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="message">Message</Label>
                                        <textarea
                                            id="message"
                                            rows={6}
                                            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                                            value={formData.message}
                                            onChange={(e) =>
                                                setFormData({ ...formData, message: e.target.value })
                                            }
                                            required
                                        />
                                    </div>
                                    <Button type="submit" className="w-full" disabled={submitting}>
                                        {submitting ? "Sending..." : "Send Message"}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        {/* Contact Information */}
                        <div className="space-y-6">
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <Mail className="h-6 w-6 text-primary mt-1" />
                                        <div>
                                            <h3 className="font-semibold mb-1">Email</h3>
                                            <p className="text-muted-foreground">
                                                hello@adirebyregalia.com
                                            </p>
                                            <p className="text-muted-foreground">
                                                support@adirebyregalia.com
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <Phone className="h-6 w-6 text-primary mt-1" />
                                        <div>
                                            <h3 className="font-semibold mb-1">Phone</h3>
                                            <p className="text-muted-foreground">
                                                +234 (0) 123 456 7890
                                            </p>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                Mon-Fri, 9am-6pm (WAT)
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <MapPin className="h-6 w-6 text-primary mt-1" />
                                        <div>
                                            <h3 className="font-semibold mb-1">Location</h3>
                                            <p className="text-muted-foreground">
                                                Lagos, Nigeria
                                            </p>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                Showroom visits by appointment
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-muted/30">
                                <CardContent className="p-6">
                                    <h3 className="font-semibold mb-2">Customer Service</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Our team typically responds within 24-48 hours. For urgent
                                        inquiries, please call us during business hours.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
