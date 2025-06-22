"use client";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import bcrypt from "bcryptjs";

// Zod validation schema
const signupSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name must be less than 50 characters")
      .regex(/^[a-zA-Z\s]+$/, "First name can only contain letters and spaces"),

    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name must be less than 50 characters")
      .regex(/^[a-zA-Z\s]+$/, "Last name can only contain letters and spaces"),

    email: z
      .string()
      .email("Please enter a valid email address")
      .min(1, "Email is required"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),

    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

interface FieldErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export function SignupForm({ role }: { role: "student" | "instructor" }) {
  const router = useRouter();
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (role !== "student" && role !== "instructor") {
    redirect("/");
  }

  // Validate individual field
  const validateField = (
    name: string,
    value: string,
    allValues?: Record<string, string>
  ) => {
    try {
      // Validate the specific field
      signupSchema.pick({ [name]: true } as any).parse({ [name]: value });

      // Special case for confirmPassword - need to check against password
      if (name === "confirmPassword" && allValues?.password) {
        if (value !== allValues.password) {
          return "Passwords do not match";
        }
      }

      return null;
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.errors[0]?.message || "Invalid input";
      }
      return null;
    }
  };

  // Handle field blur for validation
  const handleFieldBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const form = e.target.form;
    const formData = new FormData(form!);

    const allValues = {
      firstName: formData.get("first-name") as string,
      lastName: formData.get("last-name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    setTouchedFields((prev) => new Set(prev).add(name));

    const fieldName =
      name === "first-name"
        ? "firstName"
        : name === "last-name"
        ? "lastName"
        : name;

    const error = validateField(fieldName, value, allValues);

    setFieldErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));
  };

  // Handle real-time input changes - only validate if field was touched
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Only validate if field has been touched (blurred before)
    if (touchedFields.has(name)) {
      const form = e.target.form;
      const formData = new FormData(form!);

      const allValues = {
        firstName:
          name === "first-name"
            ? value
            : (formData.get("first-name") as string),
        lastName:
          name === "last-name" ? value : (formData.get("last-name") as string),
        email: name === "email" ? value : (formData.get("email") as string),
        password:
          name === "password" ? value : (formData.get("password") as string),
        confirmPassword:
          name === "confirmPassword"
            ? value
            : (formData.get("confirmPassword") as string),
      };

      const fieldName =
        name === "first-name"
          ? "firstName"
          : name === "last-name"
          ? "lastName"
          : name;

      const error = validateField(fieldName, value, allValues);

      setFieldErrors((prev) => ({
        ...prev,
        [fieldName]: error,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const rawData = {
        firstName: formData.get("first-name") as string,
        lastName: formData.get("last-name") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        confirmPassword: formData.get("confirmPassword") as string,
      };

      // Validate all fields
      const validatedData = signupSchema.parse(rawData);

      // Hash password
      const hashedPassword = await bcrypt.hash(validatedData.password, 10);

      const userRole = role === "student" ? "student" : "instructor";

      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
          email: validatedData.email,
          password: hashedPassword,
          userRole,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle specific error cases
        if (response.status === 409) {
          toast.error("Email already exists");
          setFieldErrors({
            email: "Email already exists",
          });
          setTouchedFields(new Set(["email"]));
        } else {
          throw new Error(result.message || "Failed to register");
        }
        return;
      }

      toast.success("Account created successfully");
      router.push("/login");
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        const newFieldErrors: FieldErrors = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newFieldErrors[err.path[0] as keyof FieldErrors] = err.message;
          }
        });
        setFieldErrors(newFieldErrors);

        // Mark all fields as touched to show errors
        setTouchedFields(
          new Set([
            "first-name",
            "last-name",
            "email",
            "password",
            "confirmPassword",
          ])
        );

        toast.error("Please fix the errors");
      } else {
        toast.error("Failed to register");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">
          <p className="mt-5 text-3xl font-bold leading-tight text-gray-900 sm:leading-tight sm:text-5xl lg:text-3xl lg:leading-tight font-pj">
            <span className="relative inline-flex sm:inline">
              <span className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 w-full h-full absolute inset-0"></span>
              <span className="relative">Sign Up</span>
            </span>
          </p>
        </CardTitle>
        <CardDescription>
          Enter your information to create an account for{" "}
          <span className="font-bold text-blue-500">{role.toUpperCase()}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  id="first-name"
                  name="first-name"
                  placeholder="Max"
                  className={
                    fieldErrors.firstName
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                  onBlur={handleFieldBlur}
                  onChange={handleInputChange}
                  required
                />
                {fieldErrors.firstName && touchedFields.has("first-name") && (
                  <p className="text-sm text-red-500 mt-1">
                    {fieldErrors.firstName}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  id="last-name"
                  name="last-name"
                  placeholder="Robinson"
                  className={
                    fieldErrors.lastName
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                  onBlur={handleFieldBlur}
                  onChange={handleInputChange}
                  required
                />
                {fieldErrors.lastName && touchedFields.has("last-name") && (
                  <p className="text-sm text-red-500 mt-1">
                    {fieldErrors.lastName}
                  </p>
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                className={
                  fieldErrors.email
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }
                onBlur={handleFieldBlur}
                onChange={handleInputChange}
                required
              />
              {fieldErrors.email && touchedFields.has("email") && (
                <p className="text-sm text-red-500 mt-1">{fieldErrors.email}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                className={
                  fieldErrors.password
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }
                onBlur={handleFieldBlur}
                onChange={handleInputChange}
                required
              />
              {fieldErrors.password && touchedFields.has("password") && (
                <p className="text-sm text-red-500 mt-1">
                  {fieldErrors.password}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Must contain at least 8 characters with uppercase, lowercase,
                number, and special character
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className={
                  fieldErrors.confirmPassword
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }
                onBlur={handleFieldBlur}
                onChange={handleInputChange}
                required
              />
              {fieldErrors.confirmPassword &&
                touchedFields.has("confirmPassword") && (
                  <p className="text-sm text-red-500 mt-1">
                    {fieldErrors.confirmPassword}
                  </p>
                )}
            </div>
            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating account..." : "Create an account"}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
