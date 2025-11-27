"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react"; // Icon mũi tên
import { AuthLayout } from "@/components/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";

export default function ForgotPasswordPage() {
  const form = useForm();

  return (
    <AuthLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 font-serif">Forgot Password?</h2>
        <p className="mt-2 text-gray-500">Don't worry! Enter your email to reset it.</p>
      </div>

      <Form {...form}>
        <form className="space-y-6">
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-gray-700">Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email..." {...field} className="h-12 bg-gray-50 border-gray-200" />
                </FormControl>
              </FormItem>
            )}
          />

          <Button className="w-full bg-[#0f1128] hover:bg-black h-12 text-base font-semibold">
            Send Reset Link
          </Button>
        </form>
      </Form>

      <div className="mt-8 text-center">
        <Link href="/login" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-black">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Log In
        </Link>
      </div>
    </AuthLayout>
  );
}