"use client";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {ceredntialLogin} from "@/app/actions";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {getCurrentUserRole} from "@/app/actions/user";
import {useState} from "react";

export function LoginForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        try {
            const formData = new FormData(event.currentTarget);
            const response = await ceredntialLogin(formData);

            if (!!response.error) {
                toast.error(response.error);
                setIsLoading(false);
                return;
            }

            const user = await getCurrentUserRole();

            if (!user) {
                toast.error("Failed to get user information");
                setIsLoading(false);
                return;
            }
            toast.success("Login successful! Redirecting...");

            if (user.role === "STUDENT") {
                router.push("/account/enrolled-courses");
            } else if (user.role === "INSTRUCTOR") {
                router.push("/dashboard");
            } else {
                router.push("/account");
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("An error occurred while logging in");
            setIsLoading(false);
        }
    }

    return (
        <Card className="mx-auto max-w-sm w-full">
            <CardHeader>
                <CardTitle className="text-2xl">
                    <p className="mt-5 text-3xl font-bold leading-tight text-gray-900 sm:leading-tight sm:text-5xl lg:text-3xl lg:leading-tight font-pj">
            <span className="relative inline-flex sm:inline">
              <span
                  className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 w-full h-full absolute inset-0"></span>
              <span className="relative">Login</span>
            </span>
                    </p>
                </CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={onSubmit}>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                disabled={isLoading}
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                                disabled={isLoading}
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Logging in..." : "Login"}
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/register/student"
                            className={`underline ${isLoading ? "pointer-events-none opacity-50" : ""}`}
                        >
                            Register
                        </Link>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}