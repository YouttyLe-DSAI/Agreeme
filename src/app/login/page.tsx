"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import router
import { AuthLayout } from "@/components/auth-layout";
import { GoogleIcon } from "@/components/icons/google-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// Schema validation đơn giản
const formSchema = z.object({
  identifier: z.string().min(1, "Vui lòng nhập Email"),
  password: z.string().min(1, "Vui lòng nhập mật khẩu"),
});

export default function LoginPage() {
  const router = useRouter(); // Khởi tạo router

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { identifier: "", password: "" },
  });

  // --- LOGIC ĐĂNG NHẬP ---
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Login Values:", values);

    // 1. Lấy danh sách user đã đăng ký từ localStorage (Database giả)
    const usersDB = JSON.parse(localStorage.getItem("usersDB") || "[]");
    
    // 2. Tìm xem user có tồn tại trong DB không (So khớp email)
    const foundUser = usersDB.find((u: any) => u.email === values.identifier);

    let displayName = "";

    if (foundUser) {
        // [TRƯỜNG HỢP 1] Tìm thấy user trong DB -> Lấy tên thật đã đăng ký
        displayName = foundUser.name;
        
        // (Optional) Kiểm tra mật khẩu (Giả lập đơn giản)
        // Lưu ý: Nếu muốn check pass thì bỏ comment dòng dưới
        // if (foundUser.password !== values.password) {
        //    alert("Mật khẩu không chính xác!");
        //    return;
        // }
    } else {
        // [TRƯỜNG HỢP 2] Không tìm thấy (User test nhanh chưa qua đăng ký) -> Cắt email lấy tên
        // Ví dụ: admin@gmail.com -> Tên hiển thị: admin
        displayName = values.identifier.split('@')[0];
    }

    // 3. Tạo thông tin phiên đăng nhập hiện tại
    const currentUser = {
      name: displayName, // Tên này sẽ hiện trên Navbar
      email: values.identifier,
    };

    // 4. Lưu vào localStorage để Navbar đọc được
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    // 5. Chuyển hướng về trang chủ
    router.push("/"); 
  }

  return (
    <AuthLayout>
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-gray-900 font-serif">Log In</h2>
        <p className="mt-2 text-gray-500">Welcome back! Please enter details.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Email / Identifier Field */}
          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-gray-700">Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="admin@example.com" 
                    {...field} 
                    className="h-12 bg-gray-50 border-gray-200 focus-visible:ring-gray-400" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-gray-700">Password</FormLabel>
                <FormControl>
                  <Input 
                    type="password" 
                    placeholder="******" 
                    {...field} 
                    className="h-12 bg-gray-50 border-gray-200 focus-visible:ring-gray-400" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <Link href="/forgot-password" className="text-sm font-bold text-blue-600 hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-[#0f1128] hover:bg-black text-white h-12 text-base font-semibold rounded-lg">
            Log In
          </Button>
        </form>
      </Form>

      {/* Divider */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-400">OR CONTINUE WITH</span>
        </div>
      </div>

      {/* Google Login Button (Giả lập) */}
      <Button variant="outline" className="w-full gap-2 h-12 border-gray-200 text-gray-700 font-medium hover:bg-gray-50 rounded-lg">
        <GoogleIcon /> Sign in with Google
      </Button>

      {/* Link to Sign Up */}
      <div className="mt-8 text-center text-sm text-gray-500">
        Don't have an account? <Link href="/signup" className="font-bold text-blue-600 hover:underline">Sign Up</Link>
      </div>
    </AuthLayout>
  );
}